import { redirect } from 'next/navigation'

import { currentUser } from '@clerk/nextjs'

import { DashboardShell } from '@/components/shell'
import { DashboardHeader } from '@/components/header'

export const metadata = {
    title: 'Dashboard',
    description: 'Application dashboard',
}

export default async function DashboardPage() {
    const user = await currentUser()

    if (!user) {
        redirect('/sign-in')
    }

    return (
        <DashboardShell>
            <DashboardHeader heading="Welcome!" text="" />
            <div className="grid gap-10"></div>
        </DashboardShell>
    )
}
