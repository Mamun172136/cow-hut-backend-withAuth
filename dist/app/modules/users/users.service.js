"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const hash_password_1 = __importDefault(require("../../hashPassword/hash.password"));
const users_model_1 = require("./users.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield (0, hash_password_1.default)(user.password);
    // Create a new admin object with the updated password
    const newUser = Object.assign(Object.assign({}, user), { password: hashedPassword });
    const createdUser = yield users_model_1.User.create(newUser);
    if (!createdUser) {
        throw new ApiError_1.default(400, 'failed to created user bhaiiiii');
    }
    return createdUser;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield users_model_1.User.find({});
    //   if (!createdUser) {
    //     throw new ApiError(400, 'failed to created user bhaiiiii')
    //   }
    return data;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield users_model_1.User.findById(id);
    //   if (!createdUser) {
    //     throw new ApiError(400, 'failed to created user bhaiiiii')
    //   }
    return data;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield users_model_1.User.findById(id);
    if (!foundUser) {
        throw new ApiError_1.default(404, 'User not found');
    }
    if (payload.password) {
        // Hash the provided password
        const hashedPassword = yield (0, hash_password_1.default)(payload.password);
        // Update the payload with the hashed password
        payload.password = hashedPassword;
    }
    const data = yield users_model_1.User.findOneAndUpdate({ _id: id }, payload, { new: true });
    //   if (!createdUser) {
    //     throw new ApiError(400, 'failed to created user bhaiiiii')
    //   }
    return data;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield users_model_1.User.findByIdAndDelete(id);
    //   if (!createdUser) {
    //     throw new ApiError(400, 'failed to created user bhaiiiii')
    //   }
    return data;
});
const getMyProfile = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new ApiError_1.default(401, 'You are not authorized');
    }
    let verifiedToken = null;
    try {
        verifiedToken = jsonwebtoken_1.default.verify(token, 'secret');
        console.log('decoded:', verifiedToken);
    }
    catch (error) {
        throw new ApiError_1.default(403, 'invalid  token');
    }
    console.log('verified user', verifiedToken);
    const data = yield users_model_1.User.findById(verifiedToken.id);
    console.log('data from user service for getMyprofile', data);
    // if (verifiedToken.role === 'buyer') {
    //   if (data?.buyer._id == verifiedToken.id) {
    //     console.log('buyer can see  only his orders ')
    //     return data
    //   }
    // } else if (verifiedToken.role === 'seller') {
    //   if (data?.cow.seller == verifiedToken.id) {
    //     console.log('seller can see only his orders')
    //     return data
    //   }
    // } else if (verifiedToken.role === 'admin') {
    //   console.log('admin can see all orders')
    //   return data
    // }
    return data;
});
const updateMyProfile = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new ApiError_1.default(401, 'You are not authorized');
    }
    let verifiedToken = null;
    try {
        verifiedToken = jsonwebtoken_1.default.verify(token, 'secret');
        console.log('decoded:', verifiedToken);
    }
    catch (error) {
        throw new ApiError_1.default(403, 'invalid  token');
    }
    console.log('verified user', verifiedToken);
    if (payload.password) {
        // Hash the provided password
        const hashedPassword = yield (0, hash_password_1.default)(payload.password);
        // Update the payload with the hashed password
        payload.password = hashedPassword;
    }
    const { name } = payload, userData = __rest(payload, ["name"]);
    const updatedUserData = Object.assign({}, userData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}` // `name.fisrtName`
            ;
            updatedUserData[nameKey] = name[key];
        });
    }
    const foundUser = yield users_model_1.User.findById(verifiedToken.id);
    if (!foundUser) {
        throw new ApiError_1.default(401, 'User not found');
    }
    console.log('user found from updateMyProfile', foundUser);
    const data = yield users_model_1.User.findOneAndUpdate({ _id: verifiedToken.id }, updatedUserData, { new: true });
    console.log('data from user service for updateMyprofile', data);
    // if (verifiedToken.role === 'buyer') {
    //   if (data?.buyer._id == verifiedToken.id) {
    //     console.log('buyer can see  only his orders ')
    //     return data
    //   }
    // } else if (verifiedToken.role === 'seller') {
    //   if (data?.cow.seller == verifiedToken.id) {
    //     console.log('seller can see only his orders')
    //     return data
    //   }
    // } else if (verifiedToken.role === 'admin') {
    //   console.log('admin can see all orders')
    //   return data
    // }
    return data;
});
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getMyProfile,
    updateMyProfile,
};
