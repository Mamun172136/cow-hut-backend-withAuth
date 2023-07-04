import { NextFunction, Request, Response } from 'express'
import { AuthService } from './auth.service'
import config from '../../../config'

const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...loginData } = req.body
    console.log(req.body)

    const result = await AuthService.loginAdmin(loginData)

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    }

    res.cookie('refreshToken', result.refreshToken, cookieOptions)

    res.status(200).json({
      success: true,
      message: ' admin login  successfully',
      data: result.accessToken,
    })
  } catch (error) {
    next(error)
  }
}
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...loginData } = req.body
    console.log(req.body)
    const result = await AuthService.loginUser(loginData)

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    }

    res.cookie('refreshToken', result.refreshToken, cookieOptions)

    // delete result.refreshToken

    res.status(200).json({
      success: true,
      message: ' user login  successfully',
      data: result.accessToken,
    })
  } catch (error) {
    next(error)
  }
}

//////// refresh token

// const refreshToken = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { refreshToken } = req.cookies

//     const result = await AuthService.refreshToken(refreshToken)

//     const cookieOptions = {
//       secure: config.env === 'production',
//       httpOnly: true,
//     }

//     res.cookie('refreshToken', refreshToken, cookieOptions)

//     res.status(200).json({
//       success: true,
//       message: ' user login  successfully',
//       data: result,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

export const AuthController = {
  loginAdmin,
  loginUser,
  refreshToken,
}
