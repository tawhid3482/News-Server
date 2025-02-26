import express, { NextFunction, Request, Response } from 'express'
import { upload } from '../../utils/sendImageToCloudinary'
import validationRequest from '../../middlewares/validationRequest'
import { newsValidation } from './news.validation'
import { newsController } from './news.controller'

const router = express.Router()

router.post(
  '/news',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validationRequest(newsValidation.newsValidationSchema),
  newsController.createNews,
)
export const newsRoutes = router
