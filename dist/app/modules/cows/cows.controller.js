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
exports.CowController = void 0;
const cows_service_1 = require("./cows.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constant/pagination");
const createCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = __rest(req.body, []);
        console.log(req.body);
        const result = yield cows_service_1.CowService.createCow(userData);
        res.status(200).json({
            success: true,
            message: ' cows created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllCows = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const paginationOptions = {
        //   page: Number(req.query.page),
        //   limit: Number(req.query.limit),
        //   sortBy: req.query.sortBy,
        //   sortOrder: req.query.sortOrder,
        // }
        const filters = (0, pick_1.default)(req.query, [
            'searchTerm',
            'location',
            'maxPrice',
            'minPrice',
        ]);
        const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
        const result = yield cows_service_1.CowService.getAllCows(filters, paginationOptions);
        res.status(200).json({
            success: true,
            message: ' cows retrieved successfully',
            meta: (result === null || result === void 0 ? void 0 : result.meta) || null,
            data: (result === null || result === void 0 ? void 0 : result.data) || null,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield cows_service_1.CowService.getSingleCow(id);
        res.status(200).json({
            success: true,
            message: ' cow retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const token = req.headers.authorization;
        const updatedData = req.body;
        const result = yield cows_service_1.CowService.updateCow(id, updatedData, token);
        res.status(200).json({
            success: true,
            message: ' cow updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const token = req.headers.authorization;
        const result = yield cows_service_1.CowService.deleteCow(id, token);
        res.status(200).json({
            success: true,
            message: ' cow deleted successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const id = req.params.id
//     const result = await UserService.deleteUser(id)
//     res.status(200).json({
//       success: true,
//       message: ' user updated successfully',
//       data: result,
//     })
//   } catch (error) {
//     next(error)
//   }
// }
exports.CowController = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
