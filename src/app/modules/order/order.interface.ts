import { Types } from 'mongoose'
import { IUser } from '../users/users.interface'
import { ICow } from '../cows/cows.interface'

export type IOrder = {
  buyer: Types.ObjectId | IUser
  //   cow: Types.ObjectId | ICow
  //   seller?: Types.ObjectId | IUser
  cow:
    | {
        _id: Types.ObjectId
        seller: Types.ObjectId | IUser
      }
    | ICow
}
