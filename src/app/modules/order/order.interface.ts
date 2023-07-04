import { Types } from 'mongoose'
import { IUser } from '../users/users.interface'
import { ICow } from '../cows/cows.interface'

export type IOrder = {
  buyer: Types.ObjectId | IUser
  cow: Types.ObjectId | ICow
}
