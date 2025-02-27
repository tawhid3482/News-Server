import { model, Schema } from 'mongoose'
import { TSubscription } from './subscription.interface'

const subscriptionSchema = new Schema<TSubscription>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    email: { type: String, required: true, unique: true },
    subscribedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
)

export const Subscription = model<TSubscription>(
  'subscription',
  subscriptionSchema,
)
