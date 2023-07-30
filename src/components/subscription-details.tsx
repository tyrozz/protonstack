import { SubscriptionWithProduct } from '@/types/subscriptions'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ManageSubscriptionButton } from '@/components/manage-subscription-button'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface SubscriptionDetailsProps {
    subscription: SubscriptionWithProduct
}

export function SubscriptionDetails({ subscription }: SubscriptionDetailsProps) {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Your Subscription</CardTitle>
                <CardDescription>You can see your subscription details and update your subscription </CardDescription>
            </CardHeader>
            <CardContent>
                {subscription && subscription?.status ? `Status: ${subscription?.status}` : 'You have no subscription'}{' '}
            </CardContent>
            <CardFooter className="flex justify-between">
                {subscription && subscription.status && <ManageSubscriptionButton />}
                <Link href="/pricing">
                    <Button>Pricing</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
