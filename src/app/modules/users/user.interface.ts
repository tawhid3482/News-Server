import { Model } from 'mongoose'
import { User_Role } from './user.constant'

export interface TUser {
  id?: string
  name: string
  email: string
  password: string
  needsPasswordChange: boolean
  passwordChangeAt?: Date
  gender: 'male' | 'female' | 'other'
  photo?: string
  role: 'superAdmin' | 'admin' | 'user'
  lastSignInTime?: Date
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean
}

export type TUserRole = keyof typeof User_Role
