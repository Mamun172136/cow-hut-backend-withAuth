import express from 'express'
import { UserController } from './users.controller'
import auth from '../../middlewres/auth'
import { ENUM_USER_ROLE } from '../../enums/user'
import validateRequest from '../../middlewres/validateRequest'
import { UserValidaion } from './user.validation'
const router = express.Router()

router.post(
  '/auth/signup',
  validateRequest(UserValidaion.userZodSchema),
  UserController.createUser
)
router.get('/users', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers)

router.get('/users/my-profile', UserController.getMyProfile)
router.get(
  '/users/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser
)

router.patch(
  '/users/my-profile',
  validateRequest(UserValidaion.updateUserZodSchema),
  UserController.updateMyProfile
)
router.patch(
  '/users/:id',
  validateRequest(UserValidaion.updateUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUser
)

router.delete(
  '/users/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteUser
)

export const UserRoutes = router
