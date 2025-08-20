import { Types } from "mongoose";

export type TOpinion = {
  title: string;
  slug: string;
  content: string;
  author: Types.ObjectId;
  category: Types.ObjectId;
  tags?: Types.ObjectId[];
  isPublished?: boolean;
};