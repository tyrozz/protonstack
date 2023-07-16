import { stripe } from '@/lib/stripe'

import { clerkClient } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs'

import { getURL } from '@/lib/utils'

export async function POST(req: Request) {
    if (req.method === 'POST') {
        // 1. Destructure the price and quantity from the POST body
        const { price, quantity = 1, metadata = {} } = await req.json()

        try {
            // 2. Get the user from Supabase auth
            const { userId, sessionId } = auth()
            const user = await clerkClient.users.getUser(userId as string)

            // 3. Retrieve or create the customer in Stripe
            // First check if the user already has a Stripe customer ID saved as private metadata on their Clerk user record
            let customer
            const customerStripeId = user.privateMetadata?.stripeCustomerId
            if (customerStripeId) {
                customer = await stripe.customers.retrieve(customerStripeId as string)
            } else {
                // We can use Stripe to retrieve a customer by their email address
                const existingCustomers = await stripe.customers.list({
                    email: user.emailAddresses[0].emailAddress,
                })
                if (existingCustomers.data.length > 0) {
                    customer = existingCustomers.data[0]
                } else {
                    customer = await stripe.customers.create({
                        email: user.emailAddresses[0].emailAddress,
                        name: user.firstName + ' ' + user.lastName,
                    })
                }
            }

            // 4. Create a checkout session in Stripe
            let session
            if (price.type === 'recurring') {
                session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    billing_address_collection: 'required',
                    customer: customer.id,
                    customer_update: {
                        address: 'auto',
                    },
                    line_items: [
                        {
                            price: price.id,
                            quantity,
                        },
                    ],
                    mode: 'subscription',
                    allow_promotion_codes: true,
                    // Saving the Clerk user ID as metadata on the Stripe subscription allows us to retrieve the Clerk user ID from the Stripe subscription when we receive a webhook event
                    subscription_data: {
                        trial_from_plan: true,
                        metadata: { clerkUserId: userId },
                    },
                    success_url: `${getURL()}/`,
                    cancel_url: `${getURL()}/`,
                    metadata: { userId: userId },
                })
            } else if (price.type === 'one_time') {
                session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    billing_address_collection: 'required',
                    customer: customer.id,
                    customer_update: {
                        address: 'auto',
                    },
                    line_items: [
                        {
                            price: price.id,
                            quantity,
                        },
                    ],
                    mode: 'payment',
                    allow_promotion_codes: true,
                    success_url: `${getURL()}/`,
                    cancel_url: `${getURL()}/`,
                    metadata: { userId: userId },
                })
            }

            if (session) {
                return new Response(JSON.stringify({ sessionId: session.id }), {
                    status: 200,
                })
            } else {
                return new Response(
                    JSON.stringify({
                        error: { statusCode: 500, message: 'Session is not defined' },
                    }),
                    { status: 500 }
                )
            }
        } catch (err: any) {
            return new Response(JSON.stringify(err), { status: 500 })
        }
    } else {
        return new Response('Method Not Allowed', {
            headers: { Allow: 'POST' },
            status: 405,
        })
    }
}
