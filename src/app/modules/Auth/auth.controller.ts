import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { authService } from './auth.service'
import config from '../../config'
import AppError from '../../error/AppError'

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

const changePassword = catchAsync(async(req ,res)=>{
  const {...passwordData} = req.body;
  console.log(req.body)
  const result = await authService.changePassword(req.user,passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password is updated successfully!',
    data: result,
  });
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});
const forgetPassword = catchAsync(async (req, res) => {
  const userEmail = req.body.email;
  const result = await authService.forgetPassword(userEmail);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generated successfully!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong !');
  }
  const result = await authService.resetPassword(req.body, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully!',
    data: result,
  });
});

export const authController = {
  userLogin,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword
}
