import { model, Schema } from "mongoose";
import { TAdmin } from "./admin.interface";

const adminSchema = new Schema<TAdmin>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    profilePhoto: { type: String },
    contactNumber: { type: String },
    address: { type: String },
    bio: { type: String },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    socialLinks: { type: Map, of: String }, // flexible key:value object
    isDeleted: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // createdAt & updatedAt auto add হবে
);

// Admin Model
export const Admin = model<TAdmin>("Admin", adminSchema);