import express from 'express'
import { OrderController } from './order.controller'
import auth from '../../middlewres/auth'
import { ENUM_USER_ROLE } from '../../enums/user'

const router = express.Router()

router.post('/orders/', auth(ENUM_USER_ROLE.BUYER), OrderController.createOrder)

router.get(
  '/orders/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  OrderController.getAllOrder
)

router.get(
  '/orders/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  OrderController.getOrder
)

export const OrderRoutes = router
