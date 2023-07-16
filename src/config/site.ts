export type SiteConfig = typeof siteConfig

export const siteConfig = {
    name: 'Next.js + Clerk + Stripe + Tailwind Starter',
    description: 'Jump start your Next.js app with Clerk, Stripe, and Tailwind CSS',
    mainNav: [
        {
            title: 'Home',
            href: '/',
        },
        {
            title: 'Pricing',
            href: '/pricing',
        },
    ],
    links: {
        twitter: 'https://twitter.com/',
        github: '/',
    },
}
