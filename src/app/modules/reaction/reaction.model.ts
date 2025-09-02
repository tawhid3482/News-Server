import { model, Schema } from 'mongoose'
import { TReaction } from './reaction.interface'

const reactionSchema = new Schema<TReaction>(
  {
    type: {
      type: String,
      required: true,
      enum: ['LIKE', 'LOVE', 'CARE', 'FUNNY', 'WOW', 'SAD', 'ANGRY'],
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'News', required: true },
  },
  {
    timestamps: true,
  },
)

export const Reaction = model<TReaction>('reaction', reactionSchema)
