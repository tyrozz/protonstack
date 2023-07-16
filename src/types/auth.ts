import { type z } from 'zod'
import { type userPrivateMetadataSchema } from '@/lib/validations/auth'

export type UserRole = z.infer<typeof userPrivateMetadataSchema>['role']
