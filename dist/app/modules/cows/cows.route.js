"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const cows_controller_1 = require("./cows.controller");
const user_1 = require("../../enums/user");
const auth_1 = __importDefault(require("../../middlewres/auth"));
const router = express_1.default.Router();
router.post('/cows', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SELLER), cows_controller_1.CowController.createCow);
router.get('/cows/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), cows_controller_1.CowController.getAllCows);
router.get('/cows/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), cows_controller_1.CowController.getSingleCow);
router.patch('/cows/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SELLER), cows_controller_1.CowController.updateCow);
router.delete('/cows/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SELLER), cows_controller_1.CowController.deleteCow);
exports.CowRoutes = router;
