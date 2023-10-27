"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_route_1 = require("./app/modules/users/users.route");
const globalErrorHandler_1 = __importDefault(require("./app/middlewres/globalErrorHandler"));
const cows_route_1 = require("./app/modules/cows/cows.route");
const admin_route_1 = require("./app/modules/admin/admin.route");
const auth_route_1 = require("./app/modules/auth/auth.route");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/', users_route_1.UserRoutes);
app.use('/api/v1/', cows_route_1.CowRoutes);
app.use('/api/v1/', admin_route_1.AdminRoutes);
app.use('/api/v1/', auth_route_1.AuthRoutes);
app.use('/api/v1/', order_route_1.OrderRoutes);
app.get('/', (req, res) => {
    res.send('Hello World from digital cow hut auth!');
});
//global error handler
app.use(globalErrorHandler_1.default);
// not found
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Not Found',
        errorMessage: [
            {
                path: '',
                message: 'Api not found',
            },
        ],
    });
    next();
});
exports.default = app;
