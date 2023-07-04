import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewres/globalErrorHandler'
import { CowRoutes } from './app/modules/cows/cows.route'
import { AdminRoutes } from './app/modules/admin/admin.route'
import { AuthRoutes } from './app/modules/auth/auth.route'
import cookieParser from 'cookie-parser'
import { OrderRoutes } from './app/modules/order/order.route'

const app: Application = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', UserRoutes)
app.use('/api/v1/', CowRoutes)
app.use('/api/v1/', AdminRoutes)
app.use('/api/v1/', AuthRoutes)
app.use('/api/v1/', OrderRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from digital cow hut auth!')
})

//global error handler
app.use(globalErrorHandler)

// not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: '',
        message: 'Api not found',
      },
    ],
  })
  next()
})

export default app
