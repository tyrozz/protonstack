import { redirect } from 'next/navigation'

import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs'
import { SignedIn } from '@clerk/nextjs'

import { dashboardConfig } from '@/config/dashboard'
import { MainNav } from '@/components/main-nav'
import { DashboardNav } from '@/components/nav'

interface DashboardLayoutProps {
    children?: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const user = await currentUser()

    if (!user) {
        // return notFound()
        redirect('/sign-in')
    }

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    <MainNav items={dashboardConfig.mainNav} />
                    {user && (
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    )}
                </div>
            </header>
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">
                    <DashboardNav items={dashboardConfig.sidebarNav} />
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
            </div>
        </div>
    )
}
