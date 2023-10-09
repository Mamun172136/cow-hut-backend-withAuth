/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose'
import ApiError from '../../../errors/ApiError'
import hashPassword from '../../hashPassword/hash.password'
import { IOrder } from './order.interface'
import { User } from '../users/users.model'
import { Cow } from '../cows/cows.model'
import { Order } from './order.model'
import jwt, { JwtPayload } from 'jsonwebtoken'
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

  //   const { budget } = buyerForbuying?.budget || 0
  const budget = buyerForbuying?.budget || 0

  const price = cowForSold?.price || 0

  if (budget < price) {
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
      { $inc: { income: price } },
      { new: true }
    )
    const buyerUpdate = await User.findByIdAndUpdate(
      buyer,
      { $inc: { budget: -price } },
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

// const getOrder = async (id: string, token: string) => {
//   if (!token) {
//     throw new ApiError(401, 'You are not authorized')
//   }

//   let verifiedToken = null

//   try {
//     verifiedToken = jwt.verify(token, 'secret') as JwtPayload
//     console.log('decoded:', verifiedToken)
//   } catch (error) {
//     throw new ApiError(403, 'invalid  token')
//   }

//   console.log('verified user', verifiedToken)
//   //   const data = await Order.findById(id).populate('buyer').populate('cow')
//   //   const data = await Order.findById(id)
//   //     .populate('buyer')
//   //     .populate({ path: 'cow', populate: 'seller' })

//   const data = await Order.findById(id)
//     .populate('buyer')
//     .populate({ path: 'cow', populate: { path: 'seller' } })

//   console.log('data from order service', data)

//   if (verifiedToken.role == 'buyer') {
//     if (data?.buyer.id == verifiedToken.id) {
//       console.log('buyer can see  only his orders ')
//       return data
//     }
//   } else if (verifiedToken.role == 'seller') {
//     console.log('seller')
//     if (data?.cow?.seller.id == verifiedToken.id) {
//       console.log('seller can see only his orders')
//       return data
//     }
//   } else if (verifiedToken.role == 'admin') {
//     console.log('admin can see all orders')
//     return data
//   }
// }

//////////////////////////////////
const getOrder = async (id: string, token: string) => {
  if (!token) {
    throw new ApiError(401, 'You are not authorized')
  }

  let verifiedToken = null

  try {
    verifiedToken = jwt.verify(token, 'secret') as JwtPayload
    console.log('decoded:', verifiedToken)
  } catch (error) {
    throw new ApiError(403, 'invalid token')
  }

  console.log('verified user', verifiedToken)

  const data = await Order.findById(id)
    .populate('buyer')
    .populate({
      path: 'cow',
      populate: {
        path: 'seller',
        model: 'User',
        select: 'name',
      },
    })
    .lean()
    .exec()

  console.log('data from order service', data)

  if (verifiedToken.role === 'buyer') {
    if (data?.buyer?._id == verifiedToken.id) {
      console.log('buyer can see only his orders')
      return data
    }
  } else if (verifiedToken.role === 'seller') {
    console.log('seller')
    if (data?.cow?.seller?._id == verifiedToken.id) {
      console.log('seller can see only his orders')
      return data
    }
  } else if (verifiedToken.role === 'admin') {
    console.log('admin can see all orders')
    return data
  }
  throw new ApiError(404, `No orders found for the ${verifiedToken.role}.`)
}
const getAllOrder = async (token: string) => {
  if (!token) {
    throw new ApiError(401, 'You are not authorized')
  }

  let verifiedToken: jwt.JwtPayload | null = null

  try {
    verifiedToken = jwt.verify(token, 'secret') as JwtPayload
    console.log('decoded:', verifiedToken)
  } catch (error) {
    throw new ApiError(403, 'invalid token')
  }

  console.log('verified user', verifiedToken)

  const data = await Order.find({})
    .populate('buyer')
    .populate('cow')
    .populate({
      path: 'cow',
      populate: [
        {
          path: 'seller',
        },
      ],
    })
    .lean()
    .exec()
  // .populate({
  //   path: 'cow',
  //   populate: [
  //     {
  //       path: 'seller',
  //     },
  //   ],
  // })
  // .lean()
  // .exec()

  console.log('data from get all order service', data)

  if (verifiedToken.role == 'buyer') {
    const orderForBuyer = data.find(
      order => order.buyer?._id?.toString() === verifiedToken?.id
    )
    if (orderForBuyer) {
      console.log('buyer can see only his orders')
      return [orderForBuyer] // Return as an array if found
    }
  } else if (verifiedToken.role === 'seller') {
    const orderForSeller = data.find(
      order => order.cow?.seller?._id?.toString() === verifiedToken?.id
    )
    if (orderForSeller) {
      console.log('seller can see only his orders')
      return [orderForSeller] // Return as an array if found
    }
  } else if (verifiedToken.role === 'admin') {
    console.log('admin can see all orders')
    return data
  }

  throw new ApiError(404, `No orders found for the ${verifiedToken.role}.`)
}

export const OrderService = {
  createOrder,
  getOrder,
  getAllOrder,
}
