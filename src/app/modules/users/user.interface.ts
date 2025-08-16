import { Model, Types } from 'mongoose'
import { Gender, UserRole, UserStatus } from '../../interface/enum';
import { User_Role } from './user.constant';

// User
export type TUser = {
  email: string;
  password: string;
  name: string;
  profilePhoto?: string;
  role: UserRole;
  status?: UserStatus;
  gender: Gender;
  needPasswordChange?: boolean;
  admin?: Types.ObjectId;
  author?: Types.ObjectId;
  editor?: Types.ObjectId;
};

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
