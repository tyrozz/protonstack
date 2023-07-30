import { SubscriptionWithProduct } from '@/types/subscriptions'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ManageSubscriptionButton } from '@/components/manage-subscription-button'

interface SubscriptionDetailsProps {
    subscription: SubscriptionWithProduct
}

export function SubscriptionDetails({ subscription }: SubscriptionDetailsProps) {
    const { status } = subscription

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Your Subscription</CardTitle>
                <CardDescription>You can see your subscription details and update your subscription </CardDescription>
            </CardHeader>
            <CardContent>Status: {status}</CardContent>
            <CardFooter className="flex justify-between">
                <ManageSubscriptionButton />
            </CardFooter>
        </Card>
    )
}
