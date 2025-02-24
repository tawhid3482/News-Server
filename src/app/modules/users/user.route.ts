import express, { NextFunction, Request, Response } from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { userValidation } from './user.validation'
import { UserController } from './user.controller'
import { upload } from '../../utils/sendImageToCloudinary'

const router = express.Router()

router.post(
  '/create-users',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(userValidation.createUserValidationSchema),
  UserController.createUser,
)
router.post(
  '/create-admin',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(userValidation.createUserValidationSchema),
  UserController.createAdmin,
)

export const UserRoutes = router
