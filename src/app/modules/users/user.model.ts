/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import { UserStatus } from "./user.constant";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    needPasswordChange: { type: Boolean, default: false },
    profilePhoto: { type: String },
    role: {
      type: String,
      enum: ["USER","ADMIN","SUPER_ADMIN","AUTHOR","EDITOR"],
      required: true,
      default: "USER",
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: "ACTIVE",
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      required: true,
    },
    admin: { type: Schema.Types.ObjectId, ref: "Admin" },
    author: { type: Schema.Types.ObjectId, ref: "Author" },
    editor: { type: Schema.Types.ObjectId, ref: "Editor" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ======================
// Pre-save hook → hash password
// ======================
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// ======================
// Post-save hook → hide password in response
// ======================
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// ======================
// Static methods
// ======================
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number
) {
  if (!passwordChangedTimestamp) return false;
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

// ======================
// Model export
// ======================
export const User = model<TUser, UserModel>("User", userSchema);
