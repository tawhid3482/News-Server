import { model, Schema } from 'mongoose'
import { TComment } from './comment.interface'

const commentSchema = new Schema<TComment>(
  {
    newsId: { type: Schema.Types.ObjectId, ref: 'news', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    comment: { type: String, required: true },
    isDeleted: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
  },
)

export const Comment = model<TComment>('comment', commentSchema)

