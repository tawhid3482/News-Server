import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { commentServices } from './comment.service'
import httpStatus from 'http-status'

const createComment = catchAsync(async (req, res) => {
  const result = await commentServices.createCommentIntoDB( req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment added successfully',
    data: result,
  })
})
const getAllComment = catchAsync(async (req, res) => {
  const result = await commentServices.getAllCommentFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment retrieved successfully',
    data: result,
  })
})

const getSingleComment = catchAsync(async (req, res) => {
  const {id}= req.params
  const result = await commentServices.getSingleCommentFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment retrieved successfully',
    data: result,
  })
})

const deleteComment = catchAsync(async (req, res) => {
  const {id}= req.params
  const result = await commentServices.deleteCommentFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment deleted successfully',
    data: null,
  })
})

const updateComment = catchAsync(async (req, res) => {
  const {id}= req.params
  const result = await commentServices.updateCommentFromDB(id,req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment deleted successfully',
    data: result,
  })
})

export const commentController = {
    createComment,
    getAllComment,
    getSingleComment,
    deleteComment,
    updateComment
}
