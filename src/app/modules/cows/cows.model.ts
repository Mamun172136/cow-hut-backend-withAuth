import { Model, Schema, model } from 'mongoose'

import { cowCategory, cowLabel, cowLocation } from './cows.constant'
import { ICow } from './cows.interface'

// Create a new Model type that knows about IUserMethods...
type UserModel = Model<ICow, object>

// 2. Create a Schema corresponding to the document interface.
const cowSchema = new Schema<ICow>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true, enum: cowLocation },
    breed: { type: String, required: true },
    weight: { type: Number, required: true },
    label: { type: String, required: true, enum: cowLabel },
    category: { type: String, required: true, enum: cowCategory },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

export const Cow = model<ICow, UserModel>('Cow', cowSchema)
