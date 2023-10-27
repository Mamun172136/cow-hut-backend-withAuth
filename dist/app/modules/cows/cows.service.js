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
exports.CowService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../helpers/paginationHelper");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cows_model_1 = require("./cows.model");
const createCow = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = yield cows_model_1.Cow.create(user);
    if (!createdUser) {
        throw new ApiError_1.default(400, 'failed to created cow');
    }
    return createdUser;
});
const getAllCows = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    //   const { page = 1, limit = 10 } = paginationOptions
    //   const skip = (page - 1) * limit
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const searchAbleField = ['location', 'breed', 'category'];
    const { searchTerm, maxPrice, minPrice } = filters, filtersData = __rest(filters, ["searchTerm", "maxPrice", "minPrice"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: searchAbleField.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (minPrice || maxPrice) {
        const priceCondition = {};
        if (minPrice) {
            priceCondition.$gte = minPrice;
        }
        if (maxPrice) {
            priceCondition.$lte = maxPrice;
        }
        andConditions.push({ price: priceCondition });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield cows_model_1.Cow.find(whereConditions)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield cows_model_1.Cow.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield cows_model_1.Cow.findById(id).populate('seller');
    return data;
});
const updateCow = (id, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
    const sellerOfCow = yield cows_model_1.Cow.findById(id).populate('seller');
    console.log('data from user service for updateCow', sellerOfCow);
    if (!sellerOfCow) {
        throw new ApiError_1.default(400, 'cow not found ');
    }
    console.log('data from user service for updateCow', sellerOfCow);
    if (verifiedToken.id != ((_a = sellerOfCow === null || sellerOfCow === void 0 ? void 0 : sellerOfCow.seller) === null || _a === void 0 ? void 0 : _a._id)) {
        throw new ApiError_1.default(400, ' this seller is not woner of this cow ');
    }
    const data = yield cows_model_1.Cow.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate('seller');
    return data;
});
const deleteCow = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
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
    const sellerOfCow = yield cows_model_1.Cow.findById(id).populate('seller').lean().exec();
    console.log('data from user service for updateCow', sellerOfCow);
    if (!sellerOfCow) {
        throw new ApiError_1.default(400, 'cow not found ');
    }
    console.log('data from user service for updateCow', sellerOfCow);
    if (verifiedToken.id != sellerOfCow.seller._id) {
        throw new ApiError_1.default(400, ' this seller is not woner of this cow ');
    }
    const data = yield cows_model_1.Cow.findByIdAndDelete({ _id: id });
    return data;
});
// const deleteUser = async (id: string): Promise<IUser | null> => {
//   const data = await User.findByIdAndDelete(id)
//   //   if (!createdUser) {
//   //     throw new ApiError(400, 'failed to created user bhaiiiii')
//   //   }
//   return data
// }
exports.CowService = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
