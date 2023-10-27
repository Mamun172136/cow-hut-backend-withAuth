"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cows_constant_1 = require("./cows.constant");
// 2. Create a Schema corresponding to the document interface.
const cowSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true, enum: cows_constant_1.cowLocation },
    breed: { type: String, required: true },
    weight: { type: Number, required: true },
    label: { type: String, required: true, enum: cows_constant_1.cowLabel },
    category: { type: String, required: true, enum: cows_constant_1.cowCategory },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cow = (0, mongoose_1.model)('Cow', cowSchema);
