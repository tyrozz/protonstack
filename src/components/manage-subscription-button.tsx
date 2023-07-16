'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

import { buttonVariants } from '@/components/ui/button'

export function ManageSubscriptionButton() {
    const router = useRouter()

    const redirectToCustomerPortal = async () => {
        try {
            const res = await fetch('/api/create-portal-link', {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({}),
            })
            const { url } = await res.json()

            router.push(url)
        } catch (error) {
            if (error) return alert((error as Error).message)
        }
    }

    return (
        <Button onClick={redirectToCustomerPortal} className={buttonVariants({ variant: 'outline' })}>
            Manage Subscription
        </Button>
    )
}
