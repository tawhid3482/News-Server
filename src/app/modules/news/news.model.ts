import { model, Schema } from 'mongoose'
import { TNews } from './news.interface'

const newsSchema = new Schema<TNews>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: { type: [String], default: [] },
    image: { type: String, required: false },
    views: { type: Number, required: false, default: 0 },
  },
  {
    timestamps: true,
  },
)

export const News = model<TNews>('news', newsSchema)
