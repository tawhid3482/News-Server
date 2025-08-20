import { model, Schema } from "mongoose";
import { TEditor } from "./editor.interface";

// Editor Schema
const editorSchema = new Schema<TEditor>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    profilePhoto: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: { type: String },
    bio: { type: String },
    role: {
      type: String,
      enum: ["STANDARD","SENIOR","CHIEF"],
      required: true,
      default: "STANDARD", // ধরলাম তোমার enum এ এটা default আছে
    },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    socialLinks: { type: Map, of: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // createdAt, updatedAt auto add হবে
);

// Editor Model
export const Editor = model<TEditor>("Editor", editorSchema);
