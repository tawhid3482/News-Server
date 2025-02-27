import { Model } from 'mongoose'

export interface TUser {
  id?: string
  name: string
  email: string
  password: string
  needsPasswordChange: boolean
  passwordChangeAt?: Date
  gender: 'male' | 'female' | 'other'
  photo?: string
  role: 'super-admin' | 'admin' | 'user'
  lastSignInTime?: Date
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
