import { NextFunction, Request, Response } from 'express'
import { CowService } from './cows.service'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constant/pagination'

const createCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...userData } = req.body
    console.log(req.body)
    const result = await CowService.createCow(userData)

    res.status(200).json({
      success: true,
      message: ' cows created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getAllCows = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // }
    const filters = pick(req.query, [
      'searchTerm',
      'location',
      'maxPrice',
      'minPrice',
    ])
    const paginationOptions = pick(req.query, paginationFields)
    const result = await CowService.getAllCows(filters, paginationOptions)

    res.status(200).json({
      success: true,
      message: ' cows retrieved successfully',
      meta: result?.meta || null,
      data: result?.data || null,
    })
  } catch (error) {
    next(error)
  }
}
const getSingleCow = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id
    const result = await CowService.getSingleCow(id)

    res.status(200).json({
      success: true,
      message: ' cow retrieved successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
const updateCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const token = req.headers.authorization
    const updatedData = req.body
    const result = await CowService.updateCow(id, updatedData, token as string)

    res.status(200).json({
      success: true,
      message: ' cow updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
const deleteCow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const token = req.headers.authorization

    const result = await CowService.deleteCow(id, token as string)

    res.status(200).json({
      success: true,
      message: ' cow deleted successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
// const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const id = req.params.id

//     const result = await UserService.deleteUser(id)

//     res.status(200).json({
//       success: true,
//       message: ' user updated successfully',
//       data: result,
//     })
//   } catch (error) {
//     next(error)
//   }
// }
export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
}
