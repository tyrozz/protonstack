import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { currentUser } from '@clerk/nextjs'

import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'

export const metadata: Metadata = {
    title: 'Billing',
    description: 'Manage your subscription and billing information.',
}

export default async function BillingPage() {
    const user = await currentUser()

    if (!user) {
        redirect('/sign-in')
    }

    return (
        <DashboardShell>
            <DashboardHeader heading="Billing" text="Manage your subscription and billing information." />
            <div className="grid gap-10"></div>
        </DashboardShell>
    )
}
