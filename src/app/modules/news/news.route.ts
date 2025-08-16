import express, { NextFunction, Request, Response } from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { newsValidation } from './news.validation'
import { newsController } from './news.controller'


const router = express.Router()

router.post(
  '/post',
  validationRequest(newsValidation.newsValidationSchema),
  newsController.createNews,
)

router.put(
  '/post/:id',
  validationRequest(newsValidation.updateNewsValidationSchema),
  newsController.updateNews
)

router.delete('/post/:id', newsController.deleteNews)
router.get('/post/:id', newsController.getSingleNews)
router.get('/post', newsController.getNews)

export const newsRoutes = router
