import { model, Schema } from 'mongoose'
import { TAuthor } from './author.interface'

const authorSchema = new Schema<TAuthor>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    profilePhoto: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: { type: String },
    bio: { type: String },
    socialLinks: { type: Map, of: String }, // Flexible key-value object
    isVerified: { type: Boolean, default: false },
    totalPosts: { type: Number, default: 0 },
    totalReacts: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }, // createdAt, updatedAt auto add হবে
)

// Author Model
export const Author = model<TAuthor>('Author', authorSchema)
