import { z } from 'zod'

const subscriptionValidationSchema = z.object({
  body: z.object({
    userId: z.string().nonempty('User ID is required'),
    email: z
      .string()
      .email('Invalid email format')
      .nonempty('Email is required'),
  }),
})
const updateSubscriptionValidationSchema = z.object({
  body: z.object({
      isDeleted:z.boolean().optional()
  }),
})

export const subscriptionValidation = {
  subscriptionValidationSchema,
  updateSubscriptionValidationSchema
}
