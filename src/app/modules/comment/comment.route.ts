
import express from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { commentValidation } from './comment.validation'
import { commentController } from './comment.controller'

const router = express.Router()

router.post('/comments',validationRequest(commentValidation.commentValidationSchema),commentController.createComment)
router.get('/comments',commentController.getAllComment)

export const commentRoutes = router