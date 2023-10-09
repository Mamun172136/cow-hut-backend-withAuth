import { Model, Schema, model } from 'mongoose'
import { IUser } from './users.interface'
import { userRole } from './users.constant'

// Create a new Model type that knows about IUserMethods...
type UserModel = Model<IUser, object>

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
  {
    id: { type: Schema.Types.ObjectId },
    // _id: { type: Schema.Types.ObjectId },
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: userRole },
    password: { type: String, required: true, select: 0 },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    address: { type: String },
    budget: { type: Number, required: true },
    income: { type: Number, required: true },
    // needsPasswordChange: { type: Boolean, default: true },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const User = model<IUser, UserModel>('User', userSchema)
