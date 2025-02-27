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
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("../product/product.model");
const user_model_1 = require("../user/user.model");
const blockUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    yield user_model_1.User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
});
const deleteProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(id);
    if (!product) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'product not found');
    }
    yield product_model_1.Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
});
exports.AdminService = {
    blockUserById,
    deleteProductById,
};
