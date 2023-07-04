import ApiError from '../../../errors/ApiError'
import hashPassword from '../../hashPassword/hash.password'
import { IUser } from './users.interface'
import { User } from './users.model'
import jwt from 'jsonwebtoken'
const createUser = async (user: IUser): Promise<IUser | null> => {
  const hashedPassword = await hashPassword(user.password)

  // Create a new admin object with the updated password
  const newUser: IUser = {
    ...user,
    password: hashedPassword,
  }
  const createdUser = await User.create(newUser)
  if (!createdUser) {
    throw new ApiError(400, 'failed to created user bhaiiiii')
  }
  return createdUser
}
const getAllUsers = async (): Promise<IUser[] | null> => {
  const data = await User.find({})
  //   if (!createdUser) {
  //     throw new ApiError(400, 'failed to created user bhaiiiii')
  //   }
  return data
}
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const data = await User.findById(id)
  //   if (!createdUser) {
  //     throw new ApiError(400, 'failed to created user bhaiiiii')
  //   }
  return data
}
const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const data = await User.findOneAndUpdate({ _id: id }, payload, { new: true })
  //   if (!createdUser) {
  //     throw new ApiError(400, 'failed to created user bhaiiiii')
  //   }
  return data
}

const deleteUser = async (id: string): Promise<IUser | null> => {
  const data = await User.findByIdAndDelete(id)
  //   if (!createdUser) {
  //     throw new ApiError(400, 'failed to created user bhaiiiii')
  //   }
  return data
}

const getMyProfile = async (token: string) => {
  if (!token) {
    throw new ApiError(401, 'You are not authorized')
  }

  let verifiedToken = null

  try {
    verifiedToken = jwt.verify(token, 'secret')
    console.log('decoded:', verifiedToken)
  } catch (error) {
    throw new ApiError(403, 'invalid  token')
  }

  console.log('verified user', verifiedToken)

  const data = await User.findById(verifiedToken.id)

  console.log('data from user service for getMyprofile', data)

  // if (verifiedToken.role === 'buyer') {
  //   if (data?.buyer._id == verifiedToken.id) {
  //     console.log('buyer can see  only his orders ')
  //     return data
  //   }
  // } else if (verifiedToken.role === 'seller') {
  //   if (data?.cow.seller == verifiedToken.id) {
  //     console.log('seller can see only his orders')
  //     return data
  //   }
  // } else if (verifiedToken.role === 'admin') {
  //   console.log('admin can see all orders')
  //   return data
  // }

  return data
}
export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
}
