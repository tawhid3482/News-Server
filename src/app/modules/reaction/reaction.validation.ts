import { z } from 'zod'

const reactionValidationSchema = z.object({
  body: z.object({
    postId: z.string().min(1, 'Post ID is required'),
    userId: z.string().min(1, 'User ID is required'),
    type: z.enum(['LIKE', 'LOVE', 'CARE', 'FUNNY', 'WOW', 'SAD', 'ANGRY']),
  }),
})
const updateReactionValidationSchema = z.object({
  body: z.object({
    postId: z.string().min(1, 'Post ID is required'),
    userId: z.string().min(1, 'User ID is required'),
    type: z.enum(['LIKE', 'LOVE', 'CARE', 'FUNNY', 'WOW', 'SAD', 'ANGRY']).optional(),
  }),
})

export const reactionValidation = {
  reactionValidationSchema,
  updateReactionValidationSchema
}
