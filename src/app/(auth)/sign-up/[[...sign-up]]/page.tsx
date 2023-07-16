import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <SignUp />
        </main>
    )
}
