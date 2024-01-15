'use client'

import { useRouter } from 'next/navigation'
import { useUser, SignInButton, useAuth } from '@clerk/nextjs'

import { getStripe } from '@/lib/stripe-utils'

import { useState } from 'react'

import { Price } from '@/types/subscriptions'
import { ProductWithPrices } from '@/types/subscriptions'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Icons } from '@/components/icons'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface PricingListProps {
    products: ProductWithPrices[]
}

export function Pricing({ products }: PricingListProps) {
    const { userId } = useAuth()
    const router = useRouter()
    const { toast } = useToast()
    const { user, isLoaded } = useUser()

    const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month')

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
        <>
            <div className="flex items-center space-x-2">
                <Switch
                    onCheckedChange={() => setBillingPeriod(billingPeriod === 'month' ? 'year' : 'month')}
                    id="yearly-mode"
                />
                <Label htmlFor="yearly-mode">{billingPeriod === 'month' ? 'Show Yearly' : 'Yearly'} Plans</Label>
            </div>
            {products &&
                products.map((product) => (
                    <div
                        key={product.id}
                        className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]"
                    >
                        <div className="grid gap-6">
                            <h3 className="text-xl font-bold sm:text-2xl">
                                What&apos;s included in the {product.name} plan
                            </h3>
                            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                                {product &&
                                    product.metadata &&
                                    (product.metadata as { features: string }) &&
                                    Object.entries(JSON.parse((product.metadata as { features: string }).features)).map(
                                        ([key, value]) => (
                                            <li key={key} className="flex items-center">
                                                <Icons.check className="mr-2 h-4 w-4" />
                                                {value as string}
                                            </li>
                                        )
                                    )}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4 text-center">
                            {product.prices &&
                                product.prices
                                    .filter((price) => price.recurring?.interval === billingPeriod)
                                    .map((price) => (
                                        <div key={price.id}>
                                            <div>
                                                <h4 className="text-2xl font-bold">
                                                    {price.currency && price.currency?.toUpperCase()}{' '}
                                                    {(price.unit_amount as number) / 100}
                                                </h4>
                                                {price.recurring && (
                                                    <p className="text-sm font-medium text-muted-foreground">
                                                        per {price.recurring?.interval}
                                                    </p>
                                                )}
                                            </div>
                                            {!user && (
                                                <SignInButton
                                                    mode="modal"
                                                    afterSignInUrl="/pricing"
                                                    afterSignUpUrl="/onboarding"
                                                >
                                                    <Button className="w-full">
                                                        <p>Start now</p>
                                                    </Button>
                                                </SignInButton>
                                            )}
                                            {user && (
                                                <Button onClick={() => handleCheckout(price)} className="w-full">
                                                    Checkout
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                        </div>
                    </div>
                ))}

            <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
                    Did not like the product?<strong> Please let us know.</strong>
                </p>
            </div>
        </>
    )
}
