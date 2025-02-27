import express from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { subscriptionValidation } from './subscription.validation'
import { subscriptionController } from './subscription.controller'

const router = express.Router()

router.post(
  '/subscribe',
  validationRequest(subscriptionValidation.subscriptionValidationSchema),
  subscriptionController.createSubscription,
)
router.patch(
  '/subscribe/:id',
  validationRequest(subscriptionValidation.updateSubscriptionValidationSchema),
  subscriptionController.updateSubscription,
)
router.delete('/subscribe/:id', subscriptionController.deleteSubscription)
router.get('/subscribe/:id', subscriptionController.getSingleSubscription)
router.get('/subscribe', subscriptionController.getAllSubscription)

export const subscribeRoutes = router
