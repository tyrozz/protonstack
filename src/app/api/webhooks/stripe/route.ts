import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'

import { headers } from 'next/headers'

import { clerkClient } from '@clerk/nextjs'

// import { auth } from '@clerk/nextjs'
// import { currentUser } from '@clerk/nextjs'
// import { getAuth } from '@clerk/nextjs/server'
// import type { NextApiRequest, NextApiResponse } from 'next'

const relevantEvents = new Set([
    'product.created',
    'product.updated',
    'price.created',
    'price.updated',
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted',
    'invoice.payment_succeeded',
])

export async function POST(req: Request) {
    console.log('🔔  Webhook received!')
    const body = await req.text()

    const sig = headers().get('Stripe-Signature') as string
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    let event: Stripe.Event

    try {
        if (!sig || !webhookSecret) return
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (err: any) {
        console.log(`❌ Error message: ${err.message}`)
        return new Response(`Webhook Error: ${err.message}`, { status: 400 })
    }

    const checkoutSession = event.data.object as Stripe.Checkout.Session

    if (relevantEvents.has(event.type)) {
        try {
            switch (event.type) {
                case 'customer.subscription.deleted':
                    const subs = event.data.object as Stripe.Subscription
                    const subsDetails = await stripe.subscriptions.retrieve(subs.id, {
                        expand: ['default_payment_method'],
                    })

                    await clerkClient.users.updateUser(subsDetails?.metadata.clerkUserId as string, {
                        // Update privateMetadata on the Clerk user record. Update it based on your application needs.
                        privateMetadata: {
                            // stripeSubscriptionId: subs.id,
                            stripeCustomerId: subs.customer as string,
                            // stripePriceId: subs.items.data[0]?.price.id,
                            stripeCurrentPeriodEnd: new Date(subs.current_period_end * 1000),
                        },
                    })
                case 'checkout.session.completed':
                    if (!checkoutSession?.metadata?.userId) {
                        return new Response(null, { status: 200 })
                    }
                    if (checkoutSession.mode === 'subscription') {
                        const subscriptionId = checkoutSession.subscription
                        const subscription = await stripe.subscriptions.retrieve(checkoutSession.subscription as string)

                        await clerkClient.users.updateUser(checkoutSession?.metadata?.userId as string, {
                            privateMetadata: {
                                stripeSubscriptionId: subscription.id,
                                stripeCustomerId: subscription.customer as string,
                                stripePriceId: subscription.items.data[0]?.price.id,
                                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                            },
                        })
                    }
                case 'invoice.payment_succeeded':
                    if (!checkoutSession?.metadata?.userId) {
                        return new Response(null, { status: 200 })
                    }
                    // Retrieve the subscription details from Stripe.
                    const subscription = await stripe.subscriptions.retrieve(checkoutSession.subscription as string)

                    // Update the price id and set the new period end.
                    await clerkClient.users.updateUser(checkoutSession?.metadata?.userId as string, {
                        privateMetadata: {
                            stripeSubscriptionId: subscription.id,
                            stripeCustomerId: subscription.customer as string,
                            stripePriceId: subscription.items.data[0]?.price.id,
                            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                        },
                    })

                    break
                default:
                    throw new Error('Unhandled relevant event!')
            }
        } catch (error) {
            return new Response('Webhook handler failed. View your nextjs function logs.', {
                status: 400,
            })
        }
    }
    return new Response(JSON.stringify({ received: true }))
}

// Just to see different ways of getting the user id from Clerk
// export async function GET(req: NextApiRequest) {
//     const { userId } = getAuth(req)
//     const user = await currentUser()
//     // const body = await req.body.text()
//     console.log('userId in webhook: ', userId)
//     console.log('user in webhook: ', user?.id)
//     return new Response(JSON.stringify({ received: true }))
// }
