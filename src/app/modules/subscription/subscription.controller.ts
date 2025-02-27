import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { subscriptionService } from './subscription.service'

const createSubscription = catchAsync(async (req, res) => {
  const result = await subscriptionService.createSubscriptionIntoDB(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'News Post Successfully',
    data: result,
  })
})

const getAllSubscription = catchAsync(async (req, res) => {
  const result = await subscriptionService.getAllSubFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subscription retrieved Successfully',
    data: result,
  })
})

const getSingleSubscription = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await subscriptionService.getSingleSubFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subscription retrieved Successfully',
    data: result,
  })
})
const deleteSubscription = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await subscriptionService.deleteSubFromDB(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subscription deleted Successfully',
    data: null,
  })
})

const updateSubscription = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await subscriptionService.updateSubFromDB(id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subscription updated Successfully',
    data: result,
  })
})

export const subscriptionController = {
  createSubscription,
  getAllSubscription,
  getSingleSubscription,
  deleteSubscription,
  updateSubscription,
}
