import express from 'express'
import { CowController } from './cows.controller'

const router = express.Router()

router.post('/cows', CowController.createCow)
// router.get('/users', UserController.getAllUsers)
router.get('/cows/', CowController.getAllCows)
router.get('/cows/:id', CowController.getSingleCow)

router.patch('/cows/:id', CowController.updateCow)
router.delete('/cows/:id', CowController.deleteCow)

export const CowRoutes = router
