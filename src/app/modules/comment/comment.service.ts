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
  const result = await Comment.find({ isDeleted: false })
    .populate('userId')
    .populate('newsId')
  return result
}
const getSingleCommentFromDB = async (id: string) => {
  const isCommentExist = await Comment.findById(id)
  if (!isCommentExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Comment not found')
  }
  if (isCommentExist.isDeleted === true) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Comment is already deleted!')
  }
  const result = await Comment.findById(id)
    .populate('userId')
    .populate('newsId')
  return result
}

const deleteCommentFromDB = async (id: string) => {
  const isCommentExist = await Comment.findById(id)
  if (!isCommentExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Comment not found')
  }
  if (isCommentExist.isDeleted === true) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Comment is already deleted!')
  }
  const result = await Comment.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  )
  return result
}
const updateCommentFromDB = async (id: string, payload: Partial<TComment>) => {
  const isCommentExist = await Comment.findById(id)
  if (!isCommentExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Comment not found')
  }
  if (isCommentExist.isDeleted === true) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Comment is already deleted!')
  }
  const result = await Comment.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true },
  )
  return result
}

export const commentServices = {
  createCommentIntoDB,
  getAllCommentFromDB,
  getSingleCommentFromDB,
  deleteCommentFromDB,
  updateCommentFromDB,
}
