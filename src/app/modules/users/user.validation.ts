import { z } from 'zod'

const updateStudentZodSchema = z.object({
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

export const StudentValidaion = {
  updateStudentZodSchema,
}
