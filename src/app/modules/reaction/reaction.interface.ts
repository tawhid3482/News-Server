import { Types } from 'mongoose'
import { ReactionType } from '../../interface/enum';

// Reaction
export type TReaction = {
  type: ReactionType;
  userId: Types.ObjectId;
  postId: Types.ObjectId;
};