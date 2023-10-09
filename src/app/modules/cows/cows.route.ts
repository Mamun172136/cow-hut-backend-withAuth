import express from 'express'
import { CowController } from './cows.controller'
import { ENUM_USER_ROLE } from '../../enums/user'
import auth from '../../middlewres/auth'

const router = express.Router()

router.post('/cows', auth(ENUM_USER_ROLE.SELLER), CowController.createCow)

router.get(
  '/cows/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getAllCows
)
router.get(
  '/cows/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getSingleCow
)

router.patch('/cows/:id', auth(ENUM_USER_ROLE.SELLER), CowController.updateCow)
router.delete('/cows/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow)

export const CowRoutes = router
