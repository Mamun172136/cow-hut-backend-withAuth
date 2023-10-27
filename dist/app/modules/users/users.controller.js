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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const users_service_1 = require("./users.service");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = __rest(req.body, []);
        console.log(req.body);
        const result = yield users_service_1.UserService.createUser(userData);
        res.status(200).json({
            success: true,
            message: ' users created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('token from get all users controller', req.headers.authorization);
    console.log('role from get all users controller:', req.user);
    try {
        const result = yield users_service_1.UserService.getAllUsers();
        res.status(200).json({
            success: true,
            message: ' users retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield users_service_1.UserService.getSingleUser(id);
        res.status(200).json({
            success: true,
            message: ' user retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = yield users_service_1.UserService.updateUser(id, updatedData);
        res.status(200).json({
            success: true,
            message: ' user updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield users_service_1.UserService.deleteUser(id);
        res.status(200).json({
            success: true,
            message: ' user updated successfully',
            data: result,
        });
    }
    catch (error) {
        // res.status(90).json({ biswas: error })
        next(error);
    }
});
const getMyProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const result = yield users_service_1.UserService.getMyProfile(token);
        res.status(200).json({
            success: true,
            message: ' users information retrived successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateMyProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        const payload = req.body;
        const result = yield users_service_1.UserService.updateMyProfile(token, payload);
        res.status(200).json({
            success: true,
            message: ' users information updated successfully from updateMyprodile',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getMyProfile,
    updateMyProfile,
};
