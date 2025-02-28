import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { authService } from './auth.service'
import config from '../../config'

const userLogin = catchAsync(async (req, res) => {
  const result = await authService.userLoginFrom(req.body)
  const { refreshToken, accessToken, needsPasswordChange } = result
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  })
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
      needsPasswordChange,
    },
  })
})

export const authController = {
  userLogin,
}
