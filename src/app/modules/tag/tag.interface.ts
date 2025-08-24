import { Types } from "mongoose";

// Tag
export type TTag = {
  name: string;
  posts?: Types.ObjectId[];
  opinions?: Types.ObjectId[];
  videoNews?: Types.ObjectId[];
};
