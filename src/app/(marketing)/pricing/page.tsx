import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { getActiveProductsWithPrices } from '@/lib/subscriptions'
import { siteConfig } from '@/config/site'
import { Pricing } from '@/components/pricing'
import { SiteHeader } from '@/components/site-header'
import { cn } from '@/lib/utils'

export default async function PricingPage() {
    const productsWithPrices = await getActiveProductsWithPrices()
    return (
        <>
            <SiteHeader />
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                    <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">Pricing </h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu sagittis lorem. Nulla
                        nec mi molestie, suscipit libero ac, semper dolor.{' '}
                    </p>
                    <Pricing products={productsWithPrices} afterCheckoutRedirectUrl="dashboard" />
                </div>
            </section>
        </>
    )
}
