import { z } from 'zod'
import mongoose from 'mongoose'

const newsValidationSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long'),
  content: z.string().min(20, 'Content must be at least 20 characters long'),
  category: z.string().min(3, 'Category must be at least 3 characters long'),
  author: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid author ID',
  }),
  tags: z.array(z.string()).optional(),
  image: z.string().url('Invalid image URL').optional(),
  views: z.number().nonnegative().optional(),
})
const updateNewsValidationSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters long')
    .optional(),
  content: z
    .string()
    .min(20, 'Content must be at least 20 characters long')
    .optional(),
  category: z
    .string()
    .min(3, 'Category must be at least 3 characters long')
    .optional(),
  author: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid author ID',
  }),
  tags: z.array(z.string()).optional(),
  image: z.string().url('Invalid image URL').optional(),
  views: z.number().nonnegative().optional(),
})

export const newsValidation = {
  newsValidationSchema,
  updateNewsValidationSchema,
}
