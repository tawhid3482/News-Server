import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userService } from './user.service'
import httpStatus from 'http-status'

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createImageBitmap(req.file, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

export const UserController = {
    createUser
}
