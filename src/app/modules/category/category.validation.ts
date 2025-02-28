import { z } from 'zod'

const categoryValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
})
const updateCategoryValidationSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
})

export const categoryValidation = {
  categoryValidationSchema,
  updateCategoryValidationSchema,
}
