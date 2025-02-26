import { z } from 'zod'

const newsValidationSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters long'),
    content: z.string().min(10, 'Content must be at least 20 characters long'),
    category: z.string().min(3, 'Category must be at least 3 characters long'),
    tags: z.array(z.string()).optional(),
    image: z.string().url('Invalid image URL').optional(),
    views: z.number().nonnegative().optional(),
    isDeleted:z.boolean().optional()
  }),
})

const updateNewsValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, 'Title must be at least 5 characters long')
      .optional(),
    content: z
      .string()
      .min(10, 'Content must be at least 20 characters long')
      .optional(),
    category: z
      .string()
      .min(3, 'Category must be at least 3 characters long')
      .optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().url('Invalid image URL').optional(),
    views: z.number().nonnegative().optional(),
    isDeleted:z.boolean().optional()
  }),
})

export const newsValidation = {
  newsValidationSchema,
  updateNewsValidationSchema,
}
