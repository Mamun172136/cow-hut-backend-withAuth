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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_model_1 = require("../admin/admin.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const users_model_1 = require("../users/users.model");
const mongoose_1 = require("mongoose");
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Hash the admin's password
    //   const hashedPassword = await hashPassword(admin.password)
    //   // Create a new admin object with the updated password
    //   const newAdmin: IAdmin = {
    //     ...admin,
    //     password: hashedPassword,
    //   }
    const { phoneNumber, password } = payload;
    const isUserExist = yield admin_model_1.Admin.findOne({ phoneNumber }, { password: 1, phoneNumber: 1, role: 1, needsPasswordChange: 1 });
    if (!isUserExist) {
        throw new ApiError_1.default(404, 'User does not exist');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(404, 'password is incorrect');
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        phoneNumber: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.phoneNumber,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
        id: isUserExist._id,
    }, 'secret');
    const refreshToken = jwtHelpers_1.jwtHelpers.refreshToken({
        phoneNumber: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.phoneNumber,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
        id: isUserExist._id,
    }, 'secret');
    console.log({
        accessToken,
        refreshToken,
        // needsPasswordChange: isUserExist.needsPasswordChange,
    });
    return {
        accessToken,
        refreshToken,
        // needsPasswordChange: isUserExist.needsPasswordChange,
    };
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Hash the admin's password
    //   const hashedPassword = await hashPassword(admin.password)
    //   // Create a new admin object with the updated password
    //   const newAdmin: IAdmin = {
    //     ...admin,
    //     password: hashedPassword,
    //   }
    const { phoneNumber, password } = payload;
    const isUserExist = yield users_model_1.User.findOne({ phoneNumber }, { password: 1, phoneNumber: 1, role: 1, needsPasswordChange: 1 });
    if (!isUserExist) {
        throw new ApiError_1.default(404, 'User does not exist');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(404, 'password is incorrect');
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        phoneNumber: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.phoneNumber,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
        id: isUserExist._id,
    }, 'secret');
    const refreshToken = jwtHelpers_1.jwtHelpers.refreshToken({
        phoneNumber: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.phoneNumber,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
        id: isUserExist._id,
    }, 'secret');
    console.log({
        accessToken,
        refreshToken,
        // needsPasswordChange: isUserExist.needsPasswordChange,
    });
    return {
        accessToken,
        refreshToken,
        // needsPasswordChange: isUserExist.needsPasswordChange,
    };
});
//////////// refresh token
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jsonwebtoken_1.default.verify(token, 'secret');
        console.log('decoded:', verifiedToken);
    }
    catch (error) {
        throw new ApiError_1.default(403, 'invalid refresh token');
    }
    //   const { id, role, phoneNumber } = verifiedToken;
    // tumi delete hye gso  kintu tumar refresh token ase
    // checking deleted user's refresh token
    const objectId = new mongoose_1.Types.ObjectId(verifiedToken.id);
    const isUserExist = yield users_model_1.User.findOne({ _id: objectId }, { password: 1, phoneNumber: 1, role: 1, needsPasswordChange: 1 });
    if (!isUserExist) {
        throw new ApiError_1.default(404, 'user does not exist');
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        phoneNumber: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.phoneNumber,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
        id: isUserExist._id,
    }, 'secret');
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    loginAdmin,
    loginUser,
    refreshToken,
};
