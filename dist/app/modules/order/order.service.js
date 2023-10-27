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
exports.OrderService = void 0;
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const users_model_1 = require("../users/users.model");
const cows_model_1 = require("../cows/cows.model");
const order_model_1 = require("./order.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// : Promise<IOrder | null>
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    // Hash the admin's password
    console.log('order from order service:', order);
    const { buyer, cow } = order;
    const session = yield mongoose_1.default.startSession();
    const buyerForbuying = yield users_model_1.User.findById(buyer);
    console.log('buyer for buying', buyerForbuying);
    const cowForSold = yield cows_model_1.Cow.findById(cow);
    console.log('cowForSold', cowForSold);
    const seller = yield users_model_1.User.findOne({ _id: cowForSold === null || cowForSold === void 0 ? void 0 : cowForSold.seller });
    console.log('seller of Cow', seller);
    //   const { budget } = buyerForbuying?.budget || 0
    const budget = (buyerForbuying === null || buyerForbuying === void 0 ? void 0 : buyerForbuying.budget) || 0;
    const price = (cowForSold === null || cowForSold === void 0 ? void 0 : cowForSold.price) || 0;
    if (budget < price) {
        throw new ApiError_1.default(400, 'you need money for buying');
    }
    let orderData = null;
    try {
        session.startTransaction();
        // cowForSold?.label = 'sold out'
        // seller.income += cowForSold?.price;
        // buyerForbuying?.budget -= cowForSold?.price
        //array
        const newOrder = yield order_model_1.Order.create([order], { session });
        if (!newOrder.length) {
            throw new ApiError_1.default(400, 'Failed to create student');
        }
        const sellerUpdate = yield users_model_1.User.findByIdAndUpdate(cowForSold === null || cowForSold === void 0 ? void 0 : cowForSold.seller, { $inc: { income: price } }, { new: true });
        const buyerUpdate = yield users_model_1.User.findByIdAndUpdate(buyer, { $inc: { budget: -price } }, { new: true });
        const updatedCow = yield cows_model_1.Cow.findByIdAndUpdate(cow, { label: 'sold' }, { new: true });
        console.log('sellerUpdate:', sellerUpdate);
        console.log('buyerUpdate:', buyerUpdate);
        console.log('cow Update:', updatedCow);
        orderData = newOrder[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        console.log(error);
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (orderData) {
        orderData = yield order_model_1.Order.findOne({ _id: orderData._id }).populate([
            { path: 'cow' },
            { path: 'buyer' },
        ]);
    }
    return orderData;
});
// const getOrder = async (id: string, token: string) => {
//   if (!token) {
//     throw new ApiError(401, 'You are not authorized')
//   }
//   let verifiedToken = null
//   try {
//     verifiedToken = jwt.verify(token, 'secret') as JwtPayload
//     console.log('decoded:', verifiedToken)
//   } catch (error) {
//     throw new ApiError(403, 'invalid  token')
//   }
//   console.log('verified user', verifiedToken)
//   //   const data = await Order.findById(id).populate('buyer').populate('cow')
//   //   const data = await Order.findById(id)
//   //     .populate('buyer')
//   //     .populate({ path: 'cow', populate: 'seller' })
//   const data = await Order.findById(id)
//     .populate('buyer')
//     .populate({ path: 'cow', populate: { path: 'seller' } })
//   console.log('data from order service', data)
//   if (verifiedToken.role == 'buyer') {
//     if (data?.buyer.id == verifiedToken.id) {
//       console.log('buyer can see  only his orders ')
//       return data
//     }
//   } else if (verifiedToken.role == 'seller') {
//     console.log('seller')
//     if (data?.cow?.seller.id == verifiedToken.id) {
//       console.log('seller can see only his orders')
//       return data
//     }
//   } else if (verifiedToken.role == 'admin') {
//     console.log('admin can see all orders')
//     return data
//   }
// }
//////////////////////////////////
const getOrder = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (!token) {
        throw new ApiError_1.default(401, 'You are not authorized');
    }
    let verifiedToken = null;
    try {
        verifiedToken = jsonwebtoken_1.default.verify(token, 'secret');
        console.log('decoded:', verifiedToken);
    }
    catch (error) {
        throw new ApiError_1.default(403, 'invalid token');
    }
    console.log('verified user', verifiedToken);
    const data = yield order_model_1.Order.findById(id)
        .populate('buyer')
        .populate({
        path: 'cow',
        populate: {
            path: 'seller',
            model: 'User',
            select: 'name',
        },
    })
        .lean()
        .exec();
    console.log('data from order service', data);
    if (verifiedToken.role === 'buyer') {
        if (((_a = data === null || data === void 0 ? void 0 : data.buyer) === null || _a === void 0 ? void 0 : _a._id) == verifiedToken.id) {
            console.log('buyer can see only his orders');
            return data;
        }
    }
    else if (verifiedToken.role === 'seller') {
        console.log('seller');
        if (((_c = (_b = data === null || data === void 0 ? void 0 : data.cow) === null || _b === void 0 ? void 0 : _b.seller) === null || _c === void 0 ? void 0 : _c._id) == verifiedToken.id) {
            console.log('seller can see only his orders');
            return data;
        }
    }
    else if (verifiedToken.role === 'admin') {
        console.log('admin can see all orders');
        return data;
    }
    throw new ApiError_1.default(404, `No orders found for the ${verifiedToken.role}.`);
});
const getAllOrder = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new ApiError_1.default(401, 'You are not authorized');
    }
    let verifiedToken = null;
    try {
        verifiedToken = jsonwebtoken_1.default.verify(token, 'secret');
        console.log('decoded:', verifiedToken);
    }
    catch (error) {
        throw new ApiError_1.default(403, 'invalid token');
    }
    console.log('verified user', verifiedToken);
    const data = yield order_model_1.Order.find({})
        .populate('buyer')
        .populate('cow')
        .populate({
        path: 'cow',
        populate: [
            {
                path: 'seller',
            },
        ],
    })
        .lean()
        .exec();
    // .populate({
    //   path: 'cow',
    //   populate: [
    //     {
    //       path: 'seller',
    //     },
    //   ],
    // })
    // .lean()
    // .exec()
    console.log('data from get all order service', data);
    if (verifiedToken.role == 'buyer') {
        const orderForBuyer = data.find(order => { var _a, _b; return ((_b = (_a = order.buyer) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString()) === (verifiedToken === null || verifiedToken === void 0 ? void 0 : verifiedToken.id); });
        if (orderForBuyer) {
            console.log('buyer can see only his orders');
            return [orderForBuyer]; // Return as an array if found
        }
    }
    else if (verifiedToken.role === 'seller') {
        const orderForSeller = data.find(order => { var _a, _b, _c; return ((_c = (_b = (_a = order.cow) === null || _a === void 0 ? void 0 : _a.seller) === null || _b === void 0 ? void 0 : _b._id) === null || _c === void 0 ? void 0 : _c.toString()) === (verifiedToken === null || verifiedToken === void 0 ? void 0 : verifiedToken.id); });
        if (orderForSeller) {
            console.log('seller can see only his orders');
            return [orderForSeller]; // Return as an array if found
        }
    }
    else if (verifiedToken.role === 'admin') {
        console.log('admin can see all orders');
        return data;
    }
    throw new ApiError_1.default(404, `No orders found for the ${verifiedToken.role}.`);
});
exports.OrderService = {
    createOrder,
    getOrder,
    getAllOrder,
};
