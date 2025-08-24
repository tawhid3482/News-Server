import { Schema, model, Types } from "mongoose";
import { TWebsiteReview } from "./reviews.interface";

const websiteReviewSchema = new Schema<TWebsiteReview>(
  {
    content: {
      type: String,
      required: [true, "Review content is required"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    reviewer: {
      type: Types.ObjectId,
      ref: "User",
      required: false,
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Review = model<TWebsiteReview>(
  "WebsiteReview",
  websiteReviewSchema
);
