/* eslint-disable @typescript-eslint/no-unused-vars */
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'
import { clerkClient } from '@clerk/nextjs'
import { type UserRole } from './types/auth'
import { NextResponse } from 'next/server'

export default authMiddleware({
    publicRoutes: ['/', '/about', '/pricing', '/sign-in(.*)', '/sign-up(.*)', '/api(.*)'],
    async afterAuth(auth, req, evt) {
        // handle users who aren't authenticated
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req.url })
        }

        if (auth.isPublicRoute) {
            //  For public routes, we don't need to do anything
            return NextResponse.next()
        }

        const user = await clerkClient.users.getUser(auth.userId as string)
        if (!user) {
            throw new Error('User not found.')
        }
        if (!user.privateMetadata.role) {
            await clerkClient.users.updateUserMetadata(auth.userId as string, {
                privateMetadata: {
                    role: 'user' satisfies UserRole,
                },
            })
        }
    },
})
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
