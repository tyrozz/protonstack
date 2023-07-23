import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { currentUser } from '@clerk/nextjs'

import { DashboardHeader } from '@/components/header'
import { DashboardShell } from '@/components/shell'

export const metadata: Metadata = {
    title: 'Settings',
    description: 'Manage account and website settings.',
}

export default async function SettingsPage() {
    const user = await currentUser()

    if (!user) {
        redirect('/sign-in')
    }

    return (
        <DashboardShell>
            <DashboardHeader heading="Settings" text="Manage account and website settings." />
            <div className="grid gap-10"></div>
        </DashboardShell>
    )
}
