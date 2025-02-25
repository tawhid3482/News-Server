import { Types } from "mongoose"

export type TNews = {
    title:string,
    content:string,
    category:string,
    author:Types.ObjectId,
    tags:[string],
    image:string,
    views:Number,
}