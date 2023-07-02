import ApiError from '../../../errors/ApiError'
import { IAdmin } from './admin.interface'
import { Admin } from './admin.model'

const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  const createdUser = await Admin.create(admin)
  if (!createdUser) {
    throw new ApiError(400, 'failed to created admin bhaiiiii')
  }
  return createdUser
}

export const AdminService = {
  createAdmin,
}
