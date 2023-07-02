import express from 'express'
import { AdminController } from './admin.controller'
const router = express.Router()

router.post('/auth/signup', AdminController.createAdmin)

export const UserRoutes = router
