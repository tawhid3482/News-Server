import express from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { AuthValidation } from './auth.validation'
import { authController } from './auth.controller'
import auth from '../../middlewares/auth'
import { User_Role } from '../users/user.constant'

const router = express.Router()

router.post(
  '/login',
  validationRequest(AuthValidation.loginValidationSchema),
  authController.userLogin,
)

router.post(
  '/change-password',
  auth(User_Role.superAdmin, User_Role.admin, User_Role.user),
  validationRequest(AuthValidation.changePasswordValidationSchema),
  authController.changePassword,
)

router.post(
  '/refresh-token',
  validationRequest(AuthValidation.refreshTokenValidationSchema),
  authController.refreshToken,
)

router.post(
  '/forget-password',
  validationRequest(AuthValidation.forgetPasswordValidationSchema),
  authController.forgetPassword,
)

router.post(
  '/reset-password',
  validationRequest(AuthValidation.resetPasswordValidationSchema),
  authController.resetPassword,
)

export const AuthRoutes = router
