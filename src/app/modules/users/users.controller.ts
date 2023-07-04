import { NextFunction, Request, Response } from 'express'
import { UserService } from './users.service'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...userData } = req.body
    console.log(req.body)
    const result = await UserService.createUser(userData)

    res.status(200).json({
      success: true,
      message: ' users created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  console.log('token from get all users controller', req.headers.authorization)
  console.log('role from get all users controller:', req.user)

  try {
    const result = await UserService.getAllUsers()

    res.status(200).json({
      success: true,
      message: ' users retrieved successfully',

      data: result,
    })
  } catch (error) {
    next(error)
  }
}
const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id
    const result = await UserService.getSingleUser(id)

    res.status(200).json({
      success: true,
      message: ' user retrieved successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const updatedData = req.body
    const result = await UserService.updateUser(id, updatedData)

    res.status(200).json({
      success: true,
      message: ' user updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id

    const result = await UserService.deleteUser(id)

    res.status(200).json({
      success: true,
      message: ' user updated successfully',
      data: result,
    })
  } catch (error) {
    // res.status(90).json({ biswas: error })
    next(error)
  }
}
export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
