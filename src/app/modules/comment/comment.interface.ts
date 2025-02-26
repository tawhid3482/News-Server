import { Types } from "mongoose"

export type TComment = {
  newsId:Types.ObjectId,
  userId:Types.ObjectId,
  comment:string,
  isDeleted:boolean,
}