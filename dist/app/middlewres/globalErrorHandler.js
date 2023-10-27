"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationerror_1 = __importDefault(require("../../errors/handleValidationerror"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
//import ApiError from '../../errors/ApiError';
// import handleValidationError from '../../errors/handleValidationError';
const globalErrorHandler = (error, req, 
// import { ZodError } from 'zod';
// import handleCastError from '../../errors/handleCastError';
// import handleZodError from '../../errors/handleZodError';
// import { IGenericErrorMessage } from '../../interfaces/error';
res, next) => {
    console.log('biswas:', error);
    let statusCode = 500;
    let message = 'Something went wrong !';
    let errorMessages = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifiedError = (0, handleValidationerror_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: (error === null || error === void 0 ? void 0 : error.stack) ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
