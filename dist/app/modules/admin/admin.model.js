"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const adminSchema = new mongoose_1.Schema({
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['admin'] },
    password: {
        type: String,
        required: true,
        select: 0,
    },
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
    needsPasswordChange: { type: Boolean, default: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Admin = (0, mongoose_1.model)('Admin', adminSchema);
