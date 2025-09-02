import AppError from '../../error/AppError'
import { User } from '../users/user.model'
import { TReaction } from './reaction.interface'
import { Reaction } from './reaction.model'
import httpStatus from 'http-status'
import { ObjectId } from 'mongodb'

const createReactionIntoDB = async (payload: TReaction, userEmail:any) => {
  const user = await User.findOne({ email: userEmail })
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found')
  }

   await Reaction.findOneAndDelete({ postId: payload.postId, userId: user._id })

  const result = await Reaction.create(payload)
  return result
}

const getReactionsByPostIdFromDB = async (postId: string) => {
  const result = await Reaction.find({ postId: new ObjectId(postId) }).sort({createdAt : -1}).exec()

  return result
}

const deleteReactionFromDb = async (userEmail:string, postId:string) => {
  const user = await User.findOne({ email: userEmail })
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found')
  }

  return await Reaction.findOneAndDelete({ postId: new ObjectId(postId), userId: user._id })
}


export const reactionService = {
  createReactionIntoDB,
  getReactionsByPostIdFromDB,
  deleteReactionFromDb,
}
