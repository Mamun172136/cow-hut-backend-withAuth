import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { IGenericResponse } from '../../../interfaces/common'
import { IpaginationOptions } from '../../../interfaces/pagination'
import { paginationHelpers } from '../../helpers/paginationHelper'

import { ICow } from './cows.interface'
import { Cow } from './cows.model'

const createCow = async (user: ICow): Promise<ICow | null> => {
  const createdUser = await Cow.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'failed to created cow')
  }
  return createdUser
}

const getAllCows = async (
  filters: { searchTerm: string } | any,
  paginationOptions: IpaginationOptions | any
): Promise<IGenericResponse<ICow[]> | null> => {
  //   const { page = 1, limit = 10 } = paginationOptions
  //   const skip = (page - 1) * limit
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const searchAbleField = ['location', 'breed', 'category']

  const { searchTerm, maxPrice, minPrice, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: searchAbleField.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (minPrice || maxPrice) {
    const priceCondition: { [key: string]: number } = {}
    if (minPrice) {
      priceCondition.$gte = minPrice
    }
    if (maxPrice) {
      priceCondition.$lte = maxPrice
    }
    andConditions.push({ price: priceCondition })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Cow.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await Cow.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getSingleCow = async (id: string): Promise<ICow | null> => {
  const data = await Cow.findById(id)

  return data
}
const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const data = await Cow.findOneAndUpdate({ _id: id }, payload, { new: true })

  return data
}
const deleteCow = async (id: string): Promise<ICow | null> => {
  const data = await Cow.findByIdAndDelete({ _id: id })

  return data
}

// const deleteUser = async (id: string): Promise<IUser | null> => {
//   const data = await User.findByIdAndDelete(id)
//   //   if (!createdUser) {
//   //     throw new ApiError(400, 'failed to created user bhaiiiii')
//   //   }
//   return data
// }

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
}
