import AppError from '../../error/AppError'
import { User } from '../users/user.model'
import { TComment } from './comment.interface'
import { Comment } from './comment.model'
import httpStatus from 'http-status'

const createCommentIntoDB = async (payload: TComment) => {
  const isUserExists = User.findById(payload.userId)
  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found')
  }
  const isNewsExists = User.findById(payload.newsId)
  if (!isNewsExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'News not found')
  }
  const result = await Comment.create(payload)
  return result
}

const getAllCommentFromDB = async () => {
  const result = await Comment.find().populate('userId').populate('newsId')
  return result
}

export const commentServices = {
  createCommentIntoDB,
  getAllCommentFromDB,
}
