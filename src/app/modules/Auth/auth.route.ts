import express from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { AuthValidation } from './auth.validation'
import { authController } from './auth.controller'

const router = express.Router()

router.post('/login', validationRequest(AuthValidation.loginValidationSchema),authController.userLogin)


export const  AuthRoutes = router