import { NextFunction, Request, Response } from 'express'
import { AdminService } from './admin.service'

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...adminData } = req.body
    console.log(req.body)
    const result = await AdminService.createAdmin(adminData)

    res.status(200).json({
      success: true,
      message: ' admin created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const AdminController = {
  createAdmin,
}
