import AppError from '../../error/AppError'
import { User } from '../users/user.model'
import { TSubscription } from './subscription.interface'
import { Subscription } from './subscription.model'
import httpStatus from 'http-status'

const createSubscriptionIntoDB = async (payload: TSubscription) => {
  // Check if the user exists
  const isUserExists = await User.findById(payload.userId)
  if (!isUserExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not found')
  }

  // Check if the user is already subscribed
  const isUserExistsOnSubscription = await Subscription.findOne({
    userId: payload.userId,
  })
  if (isUserExistsOnSubscription) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User has already subscribed')
  }

  const result = await Subscription.create(payload)
  return result
}

const getAllSubFromDB = async () => {
  const result = await Subscription.find({ isDeleted: false }).populate(
    'userId',
  )
  return result
}

const getSingleSubFromDB = async (id: string) => {
  const isSubExists = await Subscription.findById(id)
  if (!isSubExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Subscription not found')
  }
  if (isSubExists.isDeleted === true) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Subscription is already deleted',
    )
  }
  const result = await Subscription.findById(id).populate('userId')
  return result
}

const deleteSubFromDB = async (id: string) => {
  const isSubExists = await Subscription.findById(id)
  if (!isSubExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Subscription not found')
  }
  if (isSubExists.isDeleted === true) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Subscription is already deleted',
    )
  }
  const result = await Subscription.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  )
  return result
}

const updateSubFromDB = async (id: string, payload: Partial<TSubscription>) => {
  const isSubExists = await Subscription.findById(id)
  if (!isSubExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Subscription not found')
  }
//   if (isSubExists.isDeleted === true) {
//     throw new AppError(
//       httpStatus.BAD_REQUEST,
//       'Subscription is already deleted',
//     )
//   }
  const result = await Subscription.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true }, )
  return result
}

export const subscriptionService = {
  createSubscriptionIntoDB,
  getAllSubFromDB,
  getSingleSubFromDB,
  deleteSubFromDB,
  updateSubFromDB,
}
