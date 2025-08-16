/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateAdminId } from './user.utils'

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

export const userService = {
  createUserIntoDB,
  createAdminIntoDB,
}
