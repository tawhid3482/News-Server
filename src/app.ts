import cookieParser from 'cookie-parser'
import express, { Application } from 'express'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'
const app: Application = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api', router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(globalErrorHandler)

//Not Found
app.use((req, res, next) => {
  notFound(req, res, next)
})
export default app
