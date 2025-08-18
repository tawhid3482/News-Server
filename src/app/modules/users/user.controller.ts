import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userService } from './user.service'
import httpStatus from 'http-status'

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUserIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})
const createAdmin = catchAsync(async (req, res) => {
  const result = await userService.createAdminIntoDB(req.file, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  })
})

const getMe = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await userService.getMe(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile data fetched!",
    data: result,
  });
});


export const UserController = {
    createUser,
    createAdmin,
    getMe
}
