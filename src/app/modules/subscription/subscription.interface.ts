import { Types } from "mongoose"
  export type TSubscription = {
    userId?:Types.ObjectId,
    email:string,
    subscribedAt?:Date,
    isDeleted?:boolean
  }