import config from '../../config'
import AppError from '../../error/AppError'
import { User } from '../users/user.model'
import { TLogin } from './auth.interface'
import httpStatus from 'http-status'
import { createToken, verifyToken } from './auth.utils'
import bcrypt from 'bcrypt'
import { JwtPayload } from 'jsonwebtoken'
import { sendEmail } from '../../utils/sendEmail'

const userLoginFrom = async (payload: TLogin) => {
  const user = await User.isUserExistsByEmail(payload.email)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  const isDeleted = user?.status === 'DELETED'
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }
  const userStatus = user?.status
  if (userStatus === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')
  }
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needPasswordChange,
  }
}

const changePassword = async (
  userData: JwtPayload,
  payload: {
    oldPassword: string
    newPassword: string
  },
) => {
  const user = await User.isUserExistsByEmail(userData.userEmail)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  const isDeleted = user?.status === 'DELETED'
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }
  // checking if the user is blocked
  const userStatus = user?.status
  if (userStatus === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }
  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )
  await User.findOneAndUpdate(
    { email: userData.userEmail, role: userData.role },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  )
  return null
}
const refreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_refresh_secret as string)
  const { userEmail, iat } = decoded
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userEmail)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.status === 'DELETED'

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  // if (
  //   user.passwordChangeA &&
  //   User.isJWTIssuedBeforePasswordChanged(user.passwordChangeAt, iat as number)
  // ) {
  //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
  // }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  return {
    accessToken,
  }
}

const forgetPassword = async (userEmail: string) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userEmail)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.status === 'DELETED'
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }
  // checking if the user is blocked
  const userStatus = user?.status
  if (userStatus === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  }

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  )
const userId = await User.findOne({ email: user.email }).select('_id')

  const resetUILink = `${config.reset_pass_ui_link}?id=${userId}&token=${resetToken} `

  sendEmail(user.email, resetUILink)

  console.log(resetUILink)
}

const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload?.email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.status === 'DELETED'

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }
  // checking if the user is blocked
  const userStatus = user?.status
  if (userStatus === 'BLOCKED') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }
  const decoded = verifyToken(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload

  if (payload.email !== decoded.userEmail) {
    console.log(payload.email, decoded.userEmail)
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!')
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  await User.findOneAndUpdate(
    {
      email: decoded.userEmail,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  )
}

export const authService = {
  userLoginFrom,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword
}


