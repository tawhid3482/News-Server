import { model, Schema } from 'mongoose'
import { TUser } from './user.interface'
import { UserStatus } from './user.constant'

const userSchema = new Schema<TUser>({
  id: { type: String, unique: true, required: false },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true,select:0 },
  needsPasswordChange: { type: Boolean, default: false },
  passwordChangeAt: { type: Date },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not correct gender',
    },
  },
  photo: { type: String, required: false },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: '{VALUE} is not correct role',
    },
  },
  lastSignInTime: { type: String, required: false },
  status: {
    type: String,
    enum: {
      values: UserStatus,
      message: '{VALUE} is not correct status',
    },
    default: 'in-progress',
  },
  isDeleted: { type: Boolean, default: false },
})

export const User = model<TUser>('user', userSchema)
