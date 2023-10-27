"use strict";
// import { Model, Schema, model } from 'mongoose'
// import { IOrder } from './order.interface'
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
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
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cow: {
        type: mongoose_1.Schema.Types.Mixed,
        ref: 'Cow',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
