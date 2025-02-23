import cookieParser from 'cookie-parser'
import express, { Application } from 'express'
import router from './app/routes'
const app:Application = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api',router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app;