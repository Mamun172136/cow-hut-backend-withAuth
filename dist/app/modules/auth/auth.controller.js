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
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const config_1 = __importDefault(require("../../../config"));
const loginAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginData = __rest(req.body, []);
        console.log(req.body);
        const result = yield auth_service_1.AuthService.loginAdmin(loginData);
        const cookieOptions = {
            secure: config_1.default.env === 'production',
            httpOnly: true,
        };
        res.cookie('refreshToken', result.refreshToken, cookieOptions);
        res.status(200).json({
            success: true,
            message: ' admin login  successfully',
            // data: result.accessToken,
            data: { accessToken: result.accessToken },
        });
    }
    catch (error) {
        next(error);
    }
});
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginData = __rest(req.body, []);
        console.log(req.body);
        const result = yield auth_service_1.AuthService.loginUser(loginData);
        const cookieOptions = {
            secure: config_1.default.env === 'production',
            httpOnly: true,
        };
        res.cookie('refreshToken', result.refreshToken, cookieOptions);
        // delete result.refreshToken
        res.status(200).json({
            success: true,
            message: ' user login  successfully',
            data: { accessToken: result.accessToken },
        });
    }
    catch (error) {
        next(error);
    }
});
//////// refresh token
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.cookies;
        const result = yield auth_service_1.AuthService.refreshToken(refreshToken);
        const cookieOptions = {
            secure: config_1.default.env === 'production',
            httpOnly: true,
        };
        res.cookie('refreshToken', refreshToken, cookieOptions);
        res.status(200).json({
            success: true,
            message: ' user login  successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AuthController = {
    loginAdmin,
    loginUser,
    refreshToken,
};
