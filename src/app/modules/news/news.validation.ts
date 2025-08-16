import { z } from 'zod'

export const newsValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, 'Title must be at least 5 characters long')
      .max(150, 'Title must be less than 150 characters'),

    slug: z
      .string()
      .min(3, 'Slug must be at least 3 characters long')
      .regex(
        /^[a-z0-9-]+$/,
        'Slug can only contain lowercase letters, numbers, and hyphens',
      ),

    summary: z
      .string()
      .max(300, 'Summary must be less than 300 characters')
      .optional(),

    content: z.string().min(20, 'Content must be at least 20 characters long'),

    category: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID format'), // ObjectId validation

    author: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid author ID format')
      .optional(),

    tags: z.array(z.string().min(1, 'Tag cannot be empty')).optional(),

    coverImage: z.string().url('Invalid image URL').optional(),

    isDeleted: z.boolean().optional(),
    isPublished: z.boolean().optional(),

    publishedAt: z.string().datetime().optional(),

    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),

    reactions: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid reaction ID'))
      .optional(),
    comments: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid comment ID'))
      .optional(),

    viewsCount: z.number().nonnegative().optional(),
    views: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid view ID'))
      .optional(),

    readingTime: z.number().nonnegative().optional(),
  }),
})

const updateNewsValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, 'Title must be at least 5 characters long')
      .max(150, 'Title must be less than 150 characters').optional(),

    slug: z
      .string()
      .min(3, 'Slug must be at least 3 characters long')
      .regex(
        /^[a-z0-9-]+$/,
        'Slug can only contain lowercase letters, numbers, and hyphens',
      ).optional(),

    summary: z
      .string()
      .max(300, 'Summary must be less than 300 characters')
      .optional(),

    content: z.string().min(20, 'Content must be at least 20 characters long').optional(),

    category: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID format').optional(), // ObjectId validation

    author: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid author ID format')
      .optional(),

    tags: z.array(z.string().min(1, 'Tag cannot be empty')).optional(),

    coverImage: z.string().url('Invalid image URL').optional(),

    isDeleted: z.boolean().optional(),
    isPublished: z.boolean().optional(),

    publishedAt: z.string().datetime().optional(),

    status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),

    reactions: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid reaction ID'))
      .optional(),
    comments: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid comment ID'))
      .optional(),

    viewsCount: z.number().nonnegative().optional(),
    views: z
      .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid view ID'))
      .optional(),

    readingTime: z.number().nonnegative().optional(),
  }),
})

export const newsValidation = {
  newsValidationSchema,
  updateNewsValidationSchema,
}
