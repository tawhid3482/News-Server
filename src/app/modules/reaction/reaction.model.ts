import { model, Schema } from 'mongoose'
import { TReaction } from './reaction.interface'

const reactionSchema = new Schema<TReaction>(
  {
    newsId: { type: Schema.Types.ObjectId, ref: 'news', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    reaction: {
      type: String,
      enum: {
        values: ['like', 'love', 'care', 'funny', 'wow', 'sad', 'angry']
      },
    },
  },
  {
    timestamps: true,
  },
)

export const Reaction = model<TReaction>('reaction', reactionSchema)



