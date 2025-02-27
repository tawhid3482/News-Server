import { z } from 'zod'

const commentValidationSchema = z.object({
  body: z.object({
    newsId: z.string(),
    userId: z.string(),
    comment: z.string(),
    isDeleted: z.boolean().optional(),
  }),
})
const updateCommentValidationSchema = z.object({
  body: z.object({
    comment: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
})
export const commentValidation = {
  commentValidationSchema,
  updateCommentValidationSchema,
}
