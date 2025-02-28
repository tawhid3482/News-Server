import { Types } from 'mongoose'

export type TReaction = {
  newsId: Types.ObjectId
  userId: Types.ObjectId
  reaction:  'like' | 'love' | 'care' | 'funny' | 'wow' | 'sad' | 'angry';
}
