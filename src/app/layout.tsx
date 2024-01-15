import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import { siteConfig } from '@/config/site'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={inter.className}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                        <div className="relative flex min-h-screen flex-col">
                            <div className="flex-1">
                                {children}
                                <Toaster />
                            </div>
                        </div>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}
