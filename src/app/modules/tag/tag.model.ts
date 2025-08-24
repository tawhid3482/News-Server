import { model, Schema, Types } from "mongoose";
import { TTag } from "./tag.interface"; // or adjust path

const tagSchema = new Schema<TTag>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 2,
      maxlength: 60,
      lowercase: true,
    },

    // Relations (store ObjectId references; default to empty arrays)
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        default: [] as Types.ObjectId[],
      },
    ],
    opinions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Opinion",
        default: [] as Types.ObjectId[],
      },
    ],
    videoNews: [
      {
        type: Schema.Types.ObjectId,
        ref: "VideoNews",
        default: [] as Types.ObjectId[],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Helpful index (unique on name already set above)
tagSchema.index({ name: 1 }, { unique: true });

export const Tag = model<TTag>("Tag", tagSchema);
