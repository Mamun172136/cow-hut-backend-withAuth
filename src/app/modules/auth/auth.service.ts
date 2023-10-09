/* eslint-disable @typescript-eslint/no-unused-vars */
import ApiError from '../../../errors/ApiError'
import hashPassword from '../../hashPassword/hash.password'
import { Admin } from '../admin/admin.model'
import bcrypt from 'bcrypt'
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import { User } from '../users/users.model'
import { Types } from 'mongoose'

const loginAdmin = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  // Hash the admin's password
  //   const hashedPassword = await hashPassword(admin.password)

  //   // Create a new admin object with the updated password
  //   const newAdmin: IAdmin = {
  //     ...admin,
  //     password: hashedPassword,
  //   }

  const { phoneNumber, password } = payload
  const isUserExist = await Admin.findOne(
    { phoneNumber },
    { password: 1, phoneNumber: 1, role: 1, needsPasswordChange: 1 }
  )

  if (!isUserExist) {
    throw new ApiError(404, 'User does not exist')
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist?.password
  )

  if (!isPasswordMatched) {
    throw new ApiError(404, 'password is incorrect')
  }

  const accessToken = jwtHelpers.createToken(
    {
      phoneNumber: isUserExist?.phoneNumber,

      role: isUserExist?.role,
      id: isUserExist._id,
    },
    'secret'
  )
  const refreshToken = jwtHelpers.refreshToken(
    {
      phoneNumber: isUserExist?.phoneNumber,

      role: isUserExist?.role,
      id: isUserExist._id,
    },
    'secret'
  )

  console.log({
    accessToken,
    refreshToken,
    // needsPasswordChange: isUserExist.needsPasswordChange,
  })

  return {
    accessToken,
    refreshToken,
    // needsPasswordChange: isUserExist.needsPasswordChange,
  }
}

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  // Hash the admin's password
  //   const hashedPassword = await hashPassword(admin.password)

  //   // Create a new admin object with the updated password
  //   const newAdmin: IAdmin = {
  //     ...admin,
  //     password: hashedPassword,
  //   }

  const { phoneNumber, password } = payload

  const isUserExist = await User.findOne(
    { phoneNumber },
    { password: 1, phoneNumber: 1, role: 1, needsPasswordChange: 1 }
  )

  if (!isUserExist) {
    throw new ApiError(404, 'User does not exist')
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExist?.password
  )

  if (!isPasswordMatched) {
    throw new ApiError(404, 'password is incorrect')
  }

  const accessToken = jwtHelpers.createToken(
    {
      phoneNumber: isUserExist?.phoneNumber,

      role: isUserExist?.role,
      id: isUserExist._id,
    },
    'secret'
  )
  const refreshToken = jwtHelpers.refreshToken(
    {
      phoneNumber: isUserExist?.phoneNumber,

      role: isUserExist?.role,
      id: isUserExist._id,
    },
    'secret'
  )

  console.log({
    accessToken,
    refreshToken,
    // needsPasswordChange: isUserExist.needsPasswordChange,
  })

  return {
    accessToken,
    refreshToken,
    // needsPasswordChange: isUserExist.needsPasswordChange,
  }
}

//////////// refresh token

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null
  try {
    verifiedToken = jwt.verify(token, 'secret')
    console.log('decoded:', verifiedToken)
  } catch (error) {
    throw new ApiError(403, 'invalid refresh token')
  }

  //   const { id, role, phoneNumber } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const objectId = new Types.ObjectId((verifiedToken as JwtPayload).id)

  const isUserExist = await User.findOne(
    { _id: objectId },
    { password: 1, phoneNumber: 1, role: 1, needsPasswordChange: 1 }
  )

  if (!isUserExist) {
    throw new ApiError(404, 'user does not exist')
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      phoneNumber: isUserExist?.phoneNumber,
      role: isUserExist?.role,
      id: isUserExist._id,
    },
    'secret'
  )

  return {
    accessToken: newAccessToken,
  }
}

export const AuthService = {
  loginAdmin,
  loginUser,
  refreshToken,
}
