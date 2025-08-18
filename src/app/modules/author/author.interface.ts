import { Types } from "mongoose";

// Author
export type TAuthor = {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address?: string;
  bio?: string;
  socialLinks?: Record<string, any>;
  isVerified?: boolean;
  totalPosts?: number;
  totalReacts?: number;
  isActive?: boolean;
  user: Types.ObjectId;
};
