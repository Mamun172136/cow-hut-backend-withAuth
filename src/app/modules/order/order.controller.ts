import { NextFunction, Request, Response } from 'express'
import { OrderService } from './order.service'

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...orderData } = req.body
    console.log(req.body)
    const result = await OrderService.createOrder(orderData)

    res.status(200).json({
      success: true,
      message: ' order created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id
    const token = req.headers.authorization
    console.log(req.body)
    const result = await OrderService.getOrder(id, token as string)

    res.status(200).json({
      success: true,
      message: ' order get successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
const getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const id = req.params.id
    const token = req.headers.authorization
    console.log(req.body)
    const result = await OrderService.getAllOrder(token as string)

    res.status(200).json({
      success: true,
      message: ' order get successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const OrderController = {
  createOrder,
  getOrder,
  getAllOrder,
}
