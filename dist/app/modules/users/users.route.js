"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const auth_1 = __importDefault(require("../../middlewres/auth"));
const user_1 = require("../../enums/user");
const router = express_1.default.Router();
router.post('/auth/signup', users_controller_1.UserController.createUser);
router.get('/users', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UserController.getAllUsers);
router.get('/users/my-profile', users_controller_1.UserController.getMyProfile);
router.get('/users/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UserController.getSingleUser);
router.patch('/users/my-profile', users_controller_1.UserController.updateMyProfile);
router.patch('/users/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UserController.updateUser);
router.delete('/users/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), users_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
