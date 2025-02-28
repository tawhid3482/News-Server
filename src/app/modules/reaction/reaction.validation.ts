import { z } from 'zod'

const reactionValidationSchema = z.object({
  body: z.object({
    newsId: z.string().min(1, 'News ID is required'),
    userId: z.string().min(1, 'User ID is required'),
    reaction: z.enum(['like', 'love', 'care', 'funny', 'wow', 'sad', 'angry']),
  }),
})
const updateReactionValidationSchema = z.object({
  body: z.object({
    newsId: z.string().min(1, 'News ID is required'),
    userId: z.string().min(1, 'User ID is required'),
    reaction: z.enum(['like', 'love', 'care', 'funny', 'wow', 'sad', 'angry']).optional(),
  }),
})

export const reactValidation = {
  reactionValidationSchema,
  updateReactionValidationSchema
}
