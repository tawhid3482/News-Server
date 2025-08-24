import { Router } from 'express'
import { UserRoutes } from '../modules/users/user.route'
import { newsRoutes } from '../modules/news/news.route'
import { commentRoutes } from '../modules/comment/comment.route'
import { subscribeRoutes } from '../modules/subscription/subscription.route'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { categoryRoutes } from '../modules/category/category.route'
import { reactionRoutes } from '../modules/reaction/reaction.route'
import { OpinionRoutes } from '../modules/opinion/opinion.route'
import { ReviewRoutes } from '../modules/reviews/reviews.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/',
    route: newsRoutes,
  },
  {
    path: '/',
    route: commentRoutes,
  },
  {
    path: '/',
    route: subscribeRoutes,
  },
  {
    path: '/',
    route: AuthRoutes,
  },
  {
    path: '/',
    route: categoryRoutes,
  },
  {
    path: '/',
    route: reactionRoutes,
  },
  {
    path: '/opinion',
    route: OpinionRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
