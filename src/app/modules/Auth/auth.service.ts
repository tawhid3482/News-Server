import config from '../../config'
import AppError from '../../error/AppError'
import { User } from '../users/user.model'
import { TLogin } from './auth.interface'
import httpStatus from 'http-status'
import { createToken } from './auth.utils'

const userLoginFrom = async (payload: TLogin) => {
  const user = await User.isUserExistsByEmail(payload.email)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  const isDeleted = user?.isDeleted
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }
  const userStatus = user?.status
  if (userStatus === 'blocked') {
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
    needsPasswordChange: user?.needsPasswordChange,
  }
}

export const authService = {
  userLoginFrom,
}
