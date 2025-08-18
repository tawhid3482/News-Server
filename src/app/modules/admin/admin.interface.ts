import { Types } from "mongoose";

// Admin
export type TAdmin = {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  bio?: string;
  isActive?: boolean;
  isVerified?: boolean;
  socialLinks?: Record<string, any>;
  isDeleted?: boolean;
  user: Types.ObjectId;
};
