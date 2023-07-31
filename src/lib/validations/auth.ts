import * as z from 'zod'

export const userPrivateMetadataSchema = z.object({
    role: z.enum(['user', 'admin']).nullable().optional(),
    stripePriceId: z.string().optional().nullable(),
    stripeSubscriptionId: z.string().optional().nullable(),
    stripeCustomerId: z.string().optional().nullable(),
    stripeCurrentPeriodEnd: z.string().optional().nullable(),
})
