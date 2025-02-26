import { Schema } from 'mongoose'
import { TSubscription } from './subscription.interface'

const subscriptionSchema = new Schema<TSubscription>(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    email: { type: String, required: true },
    subscribedAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
)
