import { stripe } from '@/lib/stripe'
import { ProductWithPrices, Product, Price, SubscriptionWithProduct, Subscription } from '@/types/subscriptions'
import { auth } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs'
import { userPrivateMetadataSchema } from '@/lib/validations/auth'

export const getActiveProductsWithPrices = async (): Promise<ProductWithPrices[]> => {
    const stripeProducts = await stripe.products.list({ active: true })
    const stripePrices = await stripe.prices.list({ active: true })

    const products = stripeProducts.data.map((product) => {
        return {
            ...(product as Product),
        }
    }) as Product[]

    const prices = stripePrices.data.map((price) => {
        return {
            ...price,
            product_id: products.find((product) => product.id === price.product)?.id,
        }
    }) as Price[]

    const productsWithPrices = products.map((product) => {
        return {
            ...product,
            prices: prices.filter((price) => price.product_id === product.id),
        }
    }) as ProductWithPrices[]
    return productsWithPrices as ProductWithPrices[]
}

export const getUserSubscription = async () => {
    // const {userId } = auth()
    const user = await currentUser()

    if (!user) {
        return null
    }

    if (!user.privateMetadata) {
        return null
    }

    const userPrivateMetadata = userPrivateMetadataSchema.parse(user.privateMetadata)

    try {
        const stripePrice = await stripe.prices.retrieve(userPrivateMetadata.stripePriceId as string)
        const stripeSubscription = await stripe.subscriptions.retrieve(
            userPrivateMetadata.stripeSubscriptionId as string
        )
        const stripeProduct = await stripe.products.retrieve(stripePrice.product as string)

        const price = {
            id: stripePrice.id,
            product_id: stripePrice.product,
            active: stripePrice.active,
            currency: stripePrice.currency,
            type: stripePrice.type,
            unit_amount: stripePrice.unit_amount,
            interval: stripePrice.recurring?.interval,
            interval_count: stripePrice.recurring?.interval_count,
            metadata: stripePrice.metadata,
            billing_scheme: stripePrice.billing_scheme,
            recurring: {
                aggregate_usage: stripePrice.recurring?.aggregate_usage,
                interval: stripePrice.recurring?.interval,
                interval_count: stripePrice.recurring?.interval_count,
                trial_period_days: stripePrice.recurring?.trial_period_days,
                usage_type: stripePrice.recurring?.usage_type,
            },
        } as Price

        const subscription = {
            cancel_at: stripeSubscription.cancel_at,
            cancel_at_period_end: stripeSubscription.cancel_at_period_end,
            canceled_at: stripeSubscription.canceled_at,
            created: stripeSubscription.created,
            current_period_end: stripeSubscription.current_period_end,
            current_period_start: stripeSubscription.current_period_start,
            ended_at: stripeSubscription.ended_at,
            id: stripeSubscription.id,
            metadata: stripeSubscription.metadata,
            price_id: stripeSubscription.items.data[0].price.id,
            quantity: stripeSubscription.items.data[0].quantity,
            status: stripeSubscription.status,
            trial_end: stripeSubscription.trial_end,
            trial_start: stripeSubscription.trial_start,
            user_id: stripeSubscription.customer,
        } as Subscription

        const product = {
            ...stripeProduct,
        } as Product

        const subscriptionDetails = {
            ...subscription,
            prices: {
                ...price,
                products: product,
            },
        } as SubscriptionWithProduct
        return subscriptionDetails
    } catch (error) {
        return null
    }
}
