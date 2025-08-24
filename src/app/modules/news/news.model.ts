import { model, Schema } from 'mongoose'
import { TNews } from './news.interface'

const newsSchema = new Schema<TNews>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    summary: String,
    content: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String }],
    coverImage: String,
    isDeleted: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    publishedAt: Date,
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED", "ARCHIVED"],
      default: "DRAFT",
    },
    reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    viewsCount: { type: Number, default: 0 },
    views: [{ type: Schema.Types.ObjectId, ref: "PostView" }],
    readingTime: { type: Number, default: 0 },
  },
  { timestamps: true } // createdAt, updatedAt auto
);


export const News = model<TNews>('news', newsSchema)
