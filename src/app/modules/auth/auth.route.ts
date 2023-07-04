// import express from 'express'

// import validateRequest from '../../middlewres/validateRequest'
// import { AuthValidation } from './auth.validation'
// import { AuthController } from './auth.controller'
// const router = express.Router()

// router.post(
//   '/admin/login',
//   validateRequest(AuthValidation.loginZodSchema),
//   AuthController.loginAdmin
// )

// router.post(
//   '/auth/login',
//   validateRequest(AuthValidation.loginZodSchema),
//   AuthController.loginUser
// )

// //////// refresh token

// router.post(
//   '/auth/refresh-token',
//   validateRequest(AuthValidation.refreshTokenZodSchema),
//   AuthController.refreshToken
// )
// export const AuthRoutes = router
