/* eslint-disable @typescript-eslint/no-unused-vars */
import { Types } from 'mongoose'

export type UserName = {
  firstName: string
  lastName: string
}

export type Irole = 'seller' | 'buyer'

export type IUser = {
  _id?: Types.ObjectId
  id?: Types.ObjectId
  phoneNumber: string
  role: Irole
  password: string
  name: UserName
  address?: string
  budget: number
  income: number
  // needsPasswordChange: true | false
}
