import { Icons } from '@/components/icons'

export interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
}

export type SidebarNavItem = {
    title: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
} & (
    | {
          href: string
          items?: never
      }
    | {
          href?: string
          items: NavItem[]
      }
)
export type MainNavItem = NavItem

export type MarketingConfig = {
    mainNav: MainNavItem[]
}

export type DashboardConfig = {
    mainNav: MainNavItem[]
    sidebarNav: SidebarNavItem[]
}
