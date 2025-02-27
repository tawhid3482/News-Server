import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { authService } from './auth.service'

const userLogin = catchAsync(async (req, res) => {
  const result = await authService.userLoginFrom(req.body)
  const { refreshToken, accessToken, needsPasswordChange } = result
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
