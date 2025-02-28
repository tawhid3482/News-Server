import express from 'express';
import { reactionController } from './reaction.controller';

const router = express.Router();

router.post('/reactions', reactionController.createReaction);
router.get('/reactions/:newsId', reactionController.getReactionsByNewsId);
router.delete('/reactions/:id', reactionController.deleteReaction);

export const reactionRoutes = router;
