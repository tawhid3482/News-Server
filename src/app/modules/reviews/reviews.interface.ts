import { Types } from "mongoose";

export type TWebsiteReview = {
  content: string;
  rating: number;
  reviewer?: Types.ObjectId;
  isAnonymous?: boolean;
  isApproved?: boolean;
  isDeleted?: boolean;
};