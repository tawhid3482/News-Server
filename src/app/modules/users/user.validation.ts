import { z } from 'zod'
import { Types } from "mongoose";

// Assuming you have enums like this:
export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  AUTHOR = "AUTHOR",
  EDITOR = "EDITOR",
  USER = "USER",
}

export enum UserStatus {
  IN_PROGRESS = "IN_PROGRESS",
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

// Zod schema
export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .optional(), // optional in TUser

    profilePhoto: z.string().url({ message: "Invalid profile photo URL" }).optional(),

    role: z.enum([UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.AUTHOR, UserRole.EDITOR, UserRole.USER], {
      message: "Invalid role",
    }),

    status: z
      .enum([UserStatus.IN_PROGRESS, UserStatus.ACTIVE, UserStatus.BLOCKED], {
        message: "Invalid status",
      })
      .default(UserStatus.IN_PROGRESS),

    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER], {
      message: "Invalid gender",
    }),

    needPasswordChange: z.boolean().optional(),

    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),

    admin: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid admin ObjectId",
    }).optional(),

    author: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid author ObjectId",
    }).optional(),

    editor: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid editor ObjectId",
    }).optional(),
  }),
});

export const userValidation = {
    createUserValidationSchema
}