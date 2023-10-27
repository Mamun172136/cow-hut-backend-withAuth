"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentValidaion = void 0;
const zod_1 = require("zod");
const updateStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
            middleName: zod_1.z.string().optional(),
        }),
        phoneNumber: zod_1.z.string().optional(),
        role: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
        needsPasswordChange: zod_1.z.boolean().optional(),
    }),
});
exports.StudentValidaion = {
    updateStudentZodSchema,
};
