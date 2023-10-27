"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewres/auth"));
const user_1 = require("../../enums/user");
const router = express_1.default.Router();
router.post('/orders/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.BUYER), order_controller_1.OrderController.createOrder);
router.get('/orders/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), order_controller_1.OrderController.getAllOrder);
router.get('/orders/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), order_controller_1.OrderController.getOrder);
exports.OrderRoutes = router;
