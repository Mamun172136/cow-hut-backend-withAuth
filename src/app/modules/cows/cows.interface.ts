import { Types } from 'mongoose'
import { IUser } from '../users/users.interface'

export type UserName = {
  firstName: string
  lastName: string
}

export type Irole = 'seller' | 'buyer'
export type Icategory = 'Dairy' | 'Beef' | 'Dual Purpose'
export type Ilabel = 'for sale' | 'sold out'
export type Ilocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh'

export type ICow = {
  name: string
  age: number
  price: number
  location: Ilocation
  breed: string
  weight: number
  label: Ilabel
  category: Icategory
  // seller: Types.ObjectId | IUser
  seller: Types.ObjectId | IUser
}
