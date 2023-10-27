import { z } from 'zod'

const updateUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      middleName: z.string().optional(),
    }),

    phoneNumber: z.string().optional(),
    role: z.string().optional(),
    password: z.string().optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
    needsPasswordChange: z.boolean().optional(),
  }),
})
const userZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string(),
      lastName: z.string(),
      middleName: z.string(),
    }),

    phoneNumber: z.string(),
    role: z.string(),
    password: z.string(),
    address: z.string(),
    budget: z.number(),
    income: z.number(),
    needsPasswordChange: z.boolean(),
  }),
})

export const UserValidaion = {
  updateUserZodSchema,
  userZodSchema,
}
