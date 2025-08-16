import express, { NextFunction, Request, Response } from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { userValidation } from './user.validation'
import { UserController } from './user.controller'

const router = express.Router()

router.post(
  '/auth/sign-up',
  validationRequest(userValidation.createUserValidationSchema),
  UserController.createUser,
)

router.post(
  '/create-admin',
  validationRequest(userValidation.createUserValidationSchema),
  UserController.createAdmin,
)

export const UserRoutes = router
