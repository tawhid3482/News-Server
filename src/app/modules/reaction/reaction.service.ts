import AppError from '../../error/AppError'
import { User } from '../users/user.model'
import { TReaction } from './reaction.interface'
import { Reaction } from './reaction.model'
import httpStatus from 'http-status'
import { ObjectId } from 'mongodb'

const createReactionIntoDB = async (payload: TReaction) => {
  const user = await User.findById(payload.userId)
  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found')
  }
  const result = await (await Reaction.create(payload))
  return result
}

const getReactionsByNewsIdFromDB = async (newsId: string) => {
  const result = await Reaction.aggregate([
    { $match: { newsId: new ObjectId(newsId) } }, // Match by newsId
    { $group: { _id: '$reaction', count: { $sum: 1 } } }, // Group by reaction type
  ])
  return result
}

const deleteReactionFromDb = async (id: string) => {
  return await Reaction.findByIdAndDelete(id)
}

const updateReactionIntoDB = async (
  newsId: string,
  userId: string,
  newReaction: 'like' | 'love' | 'care' | 'funny' | 'wow' | 'sad' | 'angry',
) => {
  // Find the existing reaction for the user on the specified news post
  const existingReaction = await Reaction.findOne({ newsId, userId })

  if (!existingReaction) {
    throw new AppError(httpStatus.NOT_FOUND, 'Reaction not found')
  }

  // Update the reaction type
  existingReaction.reaction = newReaction
  await existingReaction.save()

  return existingReaction
}

export const reactionService = {
  createReactionIntoDB,
  getReactionsByNewsIdFromDB,
  deleteReactionFromDb,
  updateReactionIntoDB,
}
