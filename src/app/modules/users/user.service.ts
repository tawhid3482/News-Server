/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'
import { Admin } from '../admin/admin.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateAdminId } from './user.utils'
import { UserRole, UserStatus } from './user.validation'

const createUserIntoDB = async (payload: TUser) => {
  const userData: Partial<TUser> = {
    ...payload,
    role: 'USER',
  }

  const result = await User.create(userData)
  return result
}
const createAdminIntoDB = async (file: any, payload: TUser) => {
  const imageName = `${payload.role}${payload.name}`
  const path = file?.path
  const image = await sendImageToCloudinary(imageName, path)
  const userData: Partial<TUser> = {
    ...payload,
  }

  const result = await User.create(userData)
  return result
}

const getMe = async (userId: string) => {
  // User খুঁজে বের করা
  const userData = await User.findOne(
    { _id: userId, status: UserStatus.ACTIVE }, // where condition
    {
      email: 1,
      role: 1,
      name: 1,
      profilePhoto: 1,
      gender: 1,
      needPasswordChange: 1,
      status: 1,
      createdAt: 1,
    }
  ).lean(); // শুধু plain object ফেরত দিবে (performance ভালো হয়)

  if (!userData) return null;

  let profileData = null;

  // Role অনুযায়ী profile data খুঁজে বের করা
  if (userData.role === UserRole.ADMIN) {
    profileData = await Admin.findOne({ email: userData.email }).lean();
  } else if (userData.role === UserRole.AUTHOR) {
    profileData = await Author.findOne({ email: userData.email }).lean();
  } else if (userData.role === UserRole.EDITOR) {
    profileData = await Editor.findOne({ email: userData.email }).lean();
  } else if (userData.role === UserRole.SUPER_ADMIN) {
    profileData = await Editor.findOne({ email: userData.email }).lean();
  }

  // userData + profileData merge করা
  return { ...profileData, ...userData };
};

export const userService = {
  createUserIntoDB,
  createAdminIntoDB,
  getMe
}
