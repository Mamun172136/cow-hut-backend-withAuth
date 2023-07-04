/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose'
import ApiError from '../../../errors/ApiError'
import hashPassword from '../../hashPassword/hash.password'
import { IOrder } from './order.interface'
import { User } from '../users/users.model'
import { Cow } from '../cows/cows.model'
import { Order } from './order.model'

// : Promise<IOrder | null>

const createOrder = async (order: IOrder) => {
  // Hash the admin's password
  console.log('order from order service:', order)
  const { buyer, cow } = order
  const session = await mongoose.startSession()

  const buyerForbuying = await User.findById(buyer)
  console.log('buyer for buying', buyerForbuying)

  const cowForSold = await Cow.findById(cow)
  console.log('cowForSold', cowForSold)

  const seller = await User.findOne({ _id: cowForSold?.seller })
  console.log('seller of Cow', seller)

  if (buyerForbuying?.budget < cowForSold?.price) {
    throw new ApiError(400, 'you need money for buying')
  }
  let orderData = null
  try {
    session.startTransaction()
    // cowForSold?.label = 'sold out'

    // seller.income += cowForSold?.price;

    // buyerForbuying?.budget -= cowForSold?.price
    //array
    const newOrder = await Order.create([order], { session })

    if (!newOrder.length) {
      throw new ApiError(400, 'Failed to create student')
    }

    const sellerUpdate = await User.findByIdAndUpdate(
      cowForSold?.seller,
      { $inc: { income: cowForSold.price } },
      { new: true }
    )
    const buyerUpdate = await User.findByIdAndUpdate(
      buyer,
      { $inc: { budget: -cowForSold.price } },
      { new: true }
    )
    const updatedCow = await Cow.findByIdAndUpdate(
      cow,
      { label: 'sold' },
      { new: true }
    )
    console.log('sellerUpdate:', sellerUpdate)
    console.log('buyerUpdate:', buyerUpdate)
    console.log('cow Update:', updatedCow)

    orderData = newOrder[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    console.log(error)
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  if (orderData) {
    orderData = await Order.findOne({ _id: orderData._id }).populate([
      { path: 'cow' },
      { path: 'buyer' },
    ])
  }
  return orderData
}

export const OrderService = {
  createOrder,
}
