
import express from 'express'
import validationRequest from '../../middlewares/validationRequest'
import { commentValidation } from './comment.validation'
import { commentController } from './comment.controller'

const router = express.Router()

router.post('/comments',validationRequest(commentValidation.commentValidationSchema),commentController.createComment)
router.delete('/comments/:id', commentController.deleteComment)
router.put('/comments/:id',validationRequest(commentValidation.updateCommentValidationSchema), commentController.updateComment)
router.get('/comments/:id',commentController.getSingleComment)
router.get('/comments',commentController.getAllComment)

export const commentRoutes = router