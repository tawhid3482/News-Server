import { z } from 'zod'
import { UserStatus } from './user.constant'

const createUserValidationSchema = z.object({
  body: z.object({
    id: z.string().min(1, { message: 'ID is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    needsPasswordChange: z.boolean().optional(),
    passwordChangedAt: z.date().optional(),
    role: z.enum(['superAdmin', 'user', 'admin'], { message: 'Invalid role' }),
    status: z
      .enum([...UserStatus] as [string, ...string[]], { message: 'Invalid status' })
      .default('in-progress'),
    isDeleted: z.boolean().default(false),
  }),
})

export const userValidation = {
    createUserValidationSchema
}