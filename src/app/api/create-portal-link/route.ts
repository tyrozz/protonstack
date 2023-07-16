import { stripe } from '@/lib/stripe'

import { clerkClient } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs'

export async function POST(req: Request) {
    if (req.method === 'POST') {
        try {
            const { userId } = auth()
            const user = await clerkClient.users.getUser(userId as string)

            const existingCustomers = await stripe.customers.list({
                email: user.emailAddresses[0].emailAddress,
            })
            let customer
            if (existingCustomers.data.length > 0) {
                customer = existingCustomers.data[0]
            } else {
                customer = await stripe.customers.create({
                    email: user.emailAddresses[0].emailAddress,
                    name: user.firstName + ' ' + user.lastName,
                })
            }

            const session = await stripe.billingPortal.sessions.create({
                customer: customer.id,
                return_url: 'http://localhost:3000/',
            })

            return new Response(JSON.stringify({ url: session.url }), { status: 200 })
        } catch (error) {
            return new Response(JSON.stringify({ error: { statusCode: 500, message: 'An error happened' } }), {
                status: 500,
            })
        }
    } else {
        return new Response('Method Not Allowed', {
            headers: { Allow: 'POST' },
            status: 405,
        })
    }
}
