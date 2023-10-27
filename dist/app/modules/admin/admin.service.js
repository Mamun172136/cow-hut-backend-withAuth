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
exports.AdminService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const hash_password_1 = __importDefault(require("../../hashPassword/hash.password"));
const admin_model_1 = require("./admin.model");
const createAdmin = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    // Hash the admin's password
    const hashedPassword = yield (0, hash_password_1.default)(admin.password);
    // Create a new admin object with the updated password
    const newAdmin = Object.assign(Object.assign({}, admin), { password: hashedPassword });
    // Create the admin user in the database
    const createdAdmin = yield admin_model_1.Admin.create(newAdmin);
    if (!createdAdmin) {
        throw new ApiError_1.default(400, 'failed to created admin bhaiiiii');
    }
    return createdAdmin;
});
exports.AdminService = {
    createAdmin,
};
