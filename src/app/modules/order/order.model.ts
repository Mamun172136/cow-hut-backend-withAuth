// import { Model, Schema, model } from 'mongoose'
// import { IOrder } from './order.interface'

// // Create a new Model type that knows about IUserMethods...
// type OrderModel = Model<IOrder, object>

// // 2. Create a Schema corresponding to the document interface.
// const orderSchema = new Schema<IOrder>(
//   {
//     buyer: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     cow: {
//       type: Schema.Types.ObjectId,
//       ref: 'Cow',
//       required: true,
//     },
//     seller: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//     },
//   }
// )

// export const Order = model<IOrder, OrderModel>('Order', orderSchema)

///////////////////////////////////////////////
import { Schema, model, Document, Types } from 'mongoose'
import { IUser } from '../users/users.interface'
import { ICow } from '../cows/cows.interface'

export type IOrderDocument = {
  buyer: Types.ObjectId | IUser
  cow:
    | {
        _id: Types.ObjectId
        seller: Types.ObjectId | IUser
      }
    | ICow
} & Document

const orderSchema = new Schema<IOrderDocument>(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cow: {
      type: Schema.Types.Mixed,
      ref: 'Cow',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Order = model<IOrderDocument>('Order', orderSchema)
