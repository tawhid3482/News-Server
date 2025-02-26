import { Router } from 'express'
import { UserRoutes } from '../modules/users/user.route'
import { newsRoutes } from '../modules/news/news.route'

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
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
