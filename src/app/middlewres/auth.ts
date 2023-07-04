/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'

import ApiError from '../../errors/ApiError'
import jwt from 'jsonwebtoken'

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(401, 'You are not authorized')
      }
      // verify token
      let verifiedToken = null
      try {
        verifiedToken = jwt.verify(token, 'secret')
        console.log('decoded:', verifiedToken)
      } catch (error) {
        throw new ApiError(403, 'invalid  token')
      }

      req.user = verifiedToken // role , id

      // role diye guard korar jnno
      if (requiredRoles.length && !requiredRoles.includes(verifiedToken.role)) {
        throw new ApiError(403, 'Forbidden role ')
      }

      next()
    } catch (error) {
      next(error)
    }
  }

export default auth
