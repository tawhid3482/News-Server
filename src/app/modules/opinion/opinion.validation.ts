import { z } from "zod";

// Create Opinion Validation
const createOpinion = z.object({
  body: z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    category: z.string().min(1, "Category ID is required"), // ObjectId as string
    author: z.string().min(1, "Author ID is required"), // ObjectId as string
    tags: z.array(z.string()).optional(), // ObjectId[] as string[]
  }),
});

// Update Opinion Validation
const updateOpinion = z.object({
  body: z.object({
    title: z.string().min(5).optional(),
    slug: z.string().min(3).optional(),
    content: z.string().min(10).optional(),
    category: z.string().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

// Update Opinion Status Validation
const updateOpinionStatus = z.object({
  body: z.object({
    isPublished: z.boolean().optional(),
  }),
});

export const OpinionValidation = {
  createOpinion,
  updateOpinion,
  updateOpinionStatus,
};
