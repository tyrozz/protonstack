import { stripe } from '@/lib/stripe'
import { ProductWithPrices, Product, Price } from '@/types/subscriptions'

export const getActiveProductsWithPrices = async (): Promise<ProductWithPrices[]> => {
    const products = await stripe.products.list({ active: true })
    const prices = await stripe.prices.list({ active: true })
    const productsWithPrices = products.data.map((product) => {
        return {
            ...(product as Product),
            prices: prices.data.filter((price) => price.product === product.id),
        }
    })
    return productsWithPrices as ProductWithPrices[]
}
