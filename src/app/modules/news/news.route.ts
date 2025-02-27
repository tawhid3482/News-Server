import express, { NextFunction, Request, Response } from 'express'
import { upload } from '../../utils/sendImageToCloudinary'
import validationRequest from '../../middlewares/validationRequest'
import { newsValidation } from './news.validation'
import { newsController } from './news.controller'
import AppError from '../../error/AppError'
import httpStatus from 'http-status'

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

router.put(
  '/news/:id',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    // Check if 'data' exists before parsing
    if (req.body.data) {
      try {
        req.body = JSON.parse(req.body.data)  // Parse only if data exists
      } catch (error) {
        return next(new AppError(httpStatus.BAD_REQUEST, 'Invalid JSON format'))
      }
    }
    next()
  },
  validationRequest(newsValidation.updateNewsValidationSchema),
  newsController.updateNews
)

router.delete('/news/:id', newsController.deleteNews)
router.get('/news/:id', newsController.getSingleNews)
router.get('/news', newsController.getNews)

export const newsRoutes = router
