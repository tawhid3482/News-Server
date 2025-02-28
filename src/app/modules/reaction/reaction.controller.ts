import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { reactionService } from './reaction.service'
import httpStatus from 'http-status'

const createReaction = catchAsync(async (req, res) => {
  const result = await reactionService.createReactionIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'react send successfully',
    data: result,
  })
})
const getReactionsByNewsId = catchAsync(async (req, res) => {
  const result = await reactionService.getReactionsByNewsIdFromDB(req.params.newsId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'react send successfully',
    data: result,
  })
})
const deleteReaction = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await reactionService.deleteReactionFromDb(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'react send successfully',
    data: result,
  })
})

export const reactionController = {
  createReaction,
  getReactionsByNewsId,
  deleteReaction,
}
