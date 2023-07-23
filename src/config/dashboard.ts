import { DashboardConfig } from '@/types/nav'

export const dashboardConfig: DashboardConfig = {
    mainNav: [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        // {
        //     title: 'Support',
        //     href: '/support',
        //     disabled: true,
        // },
    ],
    sidebarNav: [
        {
            title: 'Billing',
            href: '/dashboard/billing',
            icon: 'billing',
        },
        {
            title: 'Settings',
            href: '/dashboard/settings',
            icon: 'settings',
        },
    ],
}
