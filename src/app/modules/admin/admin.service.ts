import ApiError from '../../../errors/ApiError'
import hashPassword from '../../hashPassword/hash.password'
import { IAdmin } from './admin.interface'
import { Admin } from './admin.model'

const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  // Hash the admin's password
  const hashedPassword = await hashPassword(admin.password)

  // Create a new admin object with the updated password
  const newAdmin: IAdmin = {
    ...admin,
    password: hashedPassword,
  }

  // Create the admin user in the database
  const createdAdmin = await Admin.create(newAdmin)

  if (!createdAdmin) {
    throw new ApiError(400, 'failed to created admin bhaiiiii')
  }
  return createdAdmin
}

export const AdminService = {
  createAdmin,
}
