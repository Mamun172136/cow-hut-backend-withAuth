"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const users_constant_1 = require("./users.constant");
// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose_1.Schema({
    id: { type: mongoose_1.Schema.Types.ObjectId },
    // _id: { type: Schema.Types.ObjectId },
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: users_constant_1.userRole },
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
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.User = (0, mongoose_1.model)('User', userSchema);
