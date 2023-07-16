import Link from 'next/link'

import { currentUser } from '@clerk/nextjs'

import { siteConfig } from '@/config/site'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export default async function Home() {
    const user = await currentUser()

    return (
        <>
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                    <Link
                        href={siteConfig.links.twitter}
                        className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
                        target="_blank"
                    >
                        Follow along on Twitter
                    </Link>
                    <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                        Welcome to ProtonStack: Jump start developing your next Saas project
                    </h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        Open source. With Next Js 13, Clerk.dev, Stripe, Tailwind CSS, TypeScript, and more.
                    </p>
                    <div className="space-x-4">
                        <Link href="/sign-in" className={cn(buttonVariants({ size: 'lg' }))}>
                            Get Started
                        </Link>
                        <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
                        >
                            GitHub
                        </Link>
                    </div>
                </div>
            </section>
            <section id="features" className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
                <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Features</h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        Proton is a starter kit for building a SaaS app including authentication, payments, billing, and
                        more. It&apos;s built with Next.js, Tailwind CSS, and TypeScript. It does not include a
                        database, you can add one using Prisma.
                    </p>
                </div>
                <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <div className="space-y-2">
                                <h3 className="font-bold">Next.js 13</h3>
                                <p className="text-sm text-muted-foreground">
                                    Leverage the latest features of Next.js, including Next.js 13, React 18, and more.
                                    Experience enhanced performance, better SEO, and static site generation with our
                                    open-source platform.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <div className="space-y-2">
                                <h3 className="font-bold">React 18</h3>
                                <p className="text-sm">Provide better user experience with React 18</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <div className="space-y-2">
                                <h3 className="font-bold">Components</h3>
                                <p className="text-sm text-muted-foreground">
                                    Build visually appealing interfaces that enhance user experience. Our toolkit
                                    includes Tailwind CSS and Radix UI, giving you complete creative control.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <div className="space-y-2">
                                <h3 className="font-bold">Authentication</h3>
                                <p className="text-sm text-muted-foreground">
                                    Incorporate reliable and flexible user authentication into your projects. Enjoy a
                                    customizable sign-in experience supporting a variety of authentication strategies.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <div className="space-y-2">
                                <h3 className="font-bold">Subscriptions</h3>
                                <p className="text-sm text-muted-foreground">
                                    Proton comes with built-in Stripe integration, ensuring smooth and reliable
                                    subscription payments. Now, setting up a payment gateway for your SaaS applications
                                    is a breeze.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <div className="space-y-2">
                                <h3 className="font-bold">Great developer experience</h3>
                                <p className="text-sm text-muted-foreground">
                                    Utilize an industry-leading tech stack, including TypeScript, Tailwind CSS, Zod,
                                    Eslint, Prettier, and Husky. Craft high-quality, maintainable code in an efficient
                                    manner.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto text-center md:max-w-[58rem]">
                    <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7"></p>
                </div>
            </section>
        </>
    )
}
