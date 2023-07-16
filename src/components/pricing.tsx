'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

import { getStripe } from '@/lib/stripe-utils'
import { cn } from '@/lib/utils'

import { Price } from '@/types/subscriptions'
import { ProductWithPrices } from '@/types/subscriptions'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface PricingListProps {
    products: ProductWithPrices[]
}

export function Pricing({ products }: PricingListProps) {
    const { isLoaded, userId, sessionId, getToken } = useAuth()
    const router = useRouter()
    const { toast } = useToast()

    const handleCheckout = async (price: Price) => {
        // In case the user signs out while on the page.
        if (!isLoaded || !userId) {
            return router.push('/sign-in')
        }
        try {
            const res = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ price }),
            })
            const { sessionId } = await res.json()
            console.log(sessionId)
            const stripe = await getStripe()
            stripe?.redirectToCheckout({ sessionId })
        } catch (error) {
            toast({
                title: 'Error creating checkout session',
                description: 'Please try again later.',
                variant: 'destructive',
            })
        }
    }

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-8 mx-auto">
                <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
                    Pricing Plan
                </h1>

                <p className="max-w-2xl mx-auto mt-4 text-center text-gray-500 xl:mt-6 dark:text-gray-300">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias quas magni libero consequuntur
                    voluptatum velit amet id repudiandae ea, deleniti laborum in neque eveniet.
                </p>
                <div className="grid grid-cols-1 gap-8 mt-6 xl:mt-12 xl:gap-12 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>Free</CardTitle>
                            <CardDescription>Free Subscription for a month</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4"></CardContent>
                        <CardFooter>
                            <CardFooter>{!userId && <Button className="w-full">Start now</Button>}</CardFooter>
                        </CardFooter>
                    </Card>

                    {products &&
                        products.map((product) => (
                            <Card key={product.id} className={cn('w-[380px]')}>
                                <CardHeader>
                                    <CardTitle>{product.name} Plan</CardTitle>
                                    <CardDescription>{product.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div>
                                        {product.prices.map((price, index) => (
                                            <div
                                                key={index}
                                                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                            >
                                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium leading-none">
                                                        {price.currency} {(price.unit_amount as number) / 100}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        per {price.recurring?.interval}
                                                    </p>
                                                    {!userId && (
                                                        <Button className="w-full">
                                                            <Link href="/sign-in">Start Now</Link>
                                                        </Button>
                                                    )}
                                                    {userId && (
                                                        <Button
                                                            onClick={() => handleCheckout(price)}
                                                            className="w-full"
                                                        >
                                                            Checkout
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter></CardFooter>
                            </Card>
                        ))}
                </div>
            </div>
        </div>
    )
}
