import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { reactionService } from './reaction.service'
import httpStatus from 'http-status'

const createReaction = catchAsync(async (req, res) => {
  const {userEmail}= req.user
  const result = await reactionService.createReactionIntoDB(req.body, userEmail)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'react send successfully',
    data: result,
  })
})
const getReactionsByPostId = catchAsync(async (req, res) => {
  const result = await reactionService.getReactionsByPostIdFromDB(req.params.postId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'react send successfully',
    data: result,
  })
})
const deleteReaction = catchAsync(async (req, res) => {
  const { id } = req.params
  const { userEmail } = req.user
  const result = await reactionService.deleteReactionFromDb(userEmail, id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'react send successfully',
    data: result,
  })
})

export const reactionController = {
  createReaction,
  getReactionsByPostId,
  deleteReaction,
}
