import express from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { userValidation } from './user.validation'
import { UserController } from './user.controller'

const router = express.Router()

router.post(
  '/create-users',
  validationRequest(userValidation.createUserValidationSchema),
  UserController.createUser,
)

export const UserRoutes = router
