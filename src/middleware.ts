import { authMiddleware, redirectToSignIn } from '@clerk/nextjs'

export default authMiddleware({
    publicRoutes: ['/', '/about', '/pricing', '/sign-in(.*)', '/sign-up(.*)', '/api(.*)'],
    async afterAuth(auth, req, evt) {
        // handle users who aren't authenticated
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req.url })
        }
    },
})
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
