import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewres/globalErrorHandler'
import { CowRoutes } from './app/modules/cows/cows.route'

const app: Application = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', UserRoutes)
app.use('/api/v1/', CowRoutes)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
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
