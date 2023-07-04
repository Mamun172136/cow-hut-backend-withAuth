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
//   },
//   {
//     timestamps: true,
//   }
// )

// export const Order = model<IOrder, OrderModel>('Order', orderSchema)
