import express from 'express'
import { UserController } from './users.controller'
import auth from '../../middlewres/auth'
import { ENUM_USER_ROLE } from '../../enums/user'
const router = express.Router()

router.post('/auth/signup', UserController.createUser)
router.get('/users', auth(ENUM_USER_ROLE.SELLER), UserController.getAllUsers)

router.get('/users/my-profile', UserController.getMyProfile)
router.get('/users/:id', UserController.getSingleUser)

router.patch('/users/update-profile', UserController.updateUser)
router.patch('/users/:id', UserController.updateUser)

router.delete('/users/:id', UserController.deleteUser)

export const UserRoutes = router
