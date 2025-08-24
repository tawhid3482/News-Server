import { z } from "zod";

// Reusable ObjectId string validator
const objectId = z
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, "Must be a valid Mongo ObjectId");

// CREATE
const createTag = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(60, "Name must be at most 60 characters")
      .transform((s) => s.trim().toLowerCase()),
    posts: z.array(objectId).optional(),
    opinions: z.array(objectId).optional(),
    videoNews: z.array(objectId).optional(),
  }),
});

// UPDATE (partial)
const updateTag = z.object({
  body: z.object({
    name: z
      .string()
      .min(2)
      .max(60)
      .transform((s) => s.trim().toLowerCase())
      .optional(),
    posts: z.array(objectId).optional(),
    opinions: z.array(objectId).optional(),
    videoNews: z.array(objectId).optional(),
  }),
});

// (Optional) param validation for routes like /tags/:id
export const tagIdParam = z.object({
  params: z.object({
    id: objectId,
  }),
});

export const TagValidation = {
  createTag,
  updateTag,
  tagIdParam,
};
