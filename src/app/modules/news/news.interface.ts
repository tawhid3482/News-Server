import { Types } from "mongoose"


export type TNews = {
  title: string;
  slug: string;
  summary?: string;
  content: string;
  category: Types.ObjectId;
  author: Types.ObjectId;
  tags: string[];
  coverImage?: string;
  isDeleted?: boolean;
  isPublished?: boolean;
  publishedAt?: Date;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED"; // Prisma PostStatus enum
  reactions?: Types.ObjectId[];
  comments?: Types.ObjectId[];
  viewsCount?: number;
  views?: Types.ObjectId[];
  readingTime?: number;
};

