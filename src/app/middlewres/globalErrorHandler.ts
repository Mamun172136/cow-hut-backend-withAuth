/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { IGenericErrorMessage } from '../../interfaces/error'
import handleValidationError from '../../errors/handleValidationerror'
import ApiError from '../../errors/ApiError'
import handleCastError from '../../errors/handleCastError'
import { ZodError } from 'zod'
import handleZodError from '../../errors/handleZodError'

//import ApiError from '../../errors/ApiError';

// import handleValidationError from '../../errors/handleValidationError';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,

  // import { ZodError } from 'zod';
  // import handleCastError from '../../errors/handleCastError';
  // import handleZodError from '../../errors/handleZodError';
  // import { IGenericErrorMessage } from '../../interfaces/error';
  res: Response,
  next: NextFunction
) => {
  console.log('biswas:', error)
  let statusCode = 500
  let message = 'Something went wrong !'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: error?.stack ? error?.stack : undefined,
  })
}

export default globalErrorHandler
