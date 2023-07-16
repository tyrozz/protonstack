import { getActiveProductsWithPrices } from '@/lib/subscriptions'

import { Pricing } from '@/components/pricing'

export default async function PricingPage() {
    const productsWithPrices = await getActiveProductsWithPrices()
    return <Pricing products={productsWithPrices} />
}
