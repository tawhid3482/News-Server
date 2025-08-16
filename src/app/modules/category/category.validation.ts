import { z } from 'zod'

const categoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
  }),
})


export const categoryValidation = {
  categoryValidationSchema,
}
