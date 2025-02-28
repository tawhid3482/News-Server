import express from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { categoryController } from './category.controller'
import { categoryValidation } from './category.validation'

const router = express.Router()

router.post(
  '/categories',
  validationRequest(categoryValidation.categoryValidationSchema),
  categoryController.createCategory,
)
router.get('/categories', categoryController.getAllCategory)

export const categoryRoutes = router
