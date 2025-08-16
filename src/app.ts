import cookieParser from 'cookie-parser'
import express, { Application } from 'express'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import cors from "cors";
import notFound from './app/middlewares/notFound'
const app: Application = express()

app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser())

app.use('/api/s1', router)

app.get('/', (req, res) => {
  res.send('News-Server!')
})

app.use(globalErrorHandler)

//Not Found
app.use((req, res, next) => {
  notFound(req, res, next)
})
export default app
