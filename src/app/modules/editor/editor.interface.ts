import { Types } from "mongoose";
import { EditorRole } from "../../interface/enum";

// Editor
export type TEditor = {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address?: string;
  bio?: string;
  role?: EditorRole;
  isActive?: boolean;
  isVerified?: boolean;
  socialLinks?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
  user: Types.ObjectId;
};