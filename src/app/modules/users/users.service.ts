import ApiError from '../../../errors/ApiError'
import hashPassword from '../../hashPassword/hash.password'
import { IUser } from './users.interface'
import { User } from './users.model'

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

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
