import { model, Schema } from 'mongoose'
import { TCategory } from './category.interface'

const categorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

export const Category = model<TCategory>('Category', categorySchema)
