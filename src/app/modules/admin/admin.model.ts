import { Model, Schema, model } from 'mongoose'
import { IAdmin } from './admin.interface'

// Create a new Model type that knows about IUserMethods...
type AdminModel = Model<IAdmin, object>

// 2. Create a Schema corresponding to the document interface.
const adminSchema = new Schema<IAdmin>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['admin'] },
    password: { type: String, required: true },
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema)
