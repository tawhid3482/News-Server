// Enums
export type UserRole = "ADMIN" | "USER" | "SUPER_ADMIN" | "EDITOR" | "AUTHOR";
export type ReactionType = "LIKE" | "LOVE" | "ANGRY" | "SAD" | "WOW" | "FUNNY";
export type UserStatus = "BLOCKED" | "ACTIVE" | "PENDING" | "DELETED";
export type Gender = "MALE" | "FEMALE" | "OTHER";
export type EditorRole = "STANDARD" | "SENIOR" | "CHIEF";
export type PostStatus = "DRAFT" | "PUBLISHED" | "BLOCKED";
export type SetNewsType =
  | "WORLD"
  | "WAR"
  | "POLITICS"
  | "ECONOMY"
  | "NATIONAL"
  | "SPORTS"
  | "HEALTH"
  | "SCIENCE"
  | "EDUCATION"
  | "TECHNOLOGY"
  | "ENTERTAINMENT"
  | "INVESTIGATION"
  | "OTHER";


  export interface IPostFilterRequest {
  searchTerm?: string;
  fromDate?: string;
  toDate?: string;
  tags?: string[];
  title?: string;
  slug?: string;
  category?: string;
  categoryId?: string;
  authorId?: string;
  isPublished?: boolean | string;
  status?: string;
}

export interface IPaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}