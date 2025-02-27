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
exports.productServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_constant_1 = require("./product.constant");
const product_model_1 = require("./product.model");
// const createBookIntoDb = async (productData: TProduct) => {
//   const product = new Product(productData);
//   const result = await product.save();
//   return result.toObject();
// };
const createBookIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = await User.isUserExistsByCustomId(userData.email);
    // if (user.isBlocked) {
    //   throw new AppError(
    //     StatusCodes.UNAUTHORIZED,
    //     'You are not authorized to create Book',
    //   );
    // }
    const result = yield product_model_1.Product.create(payload);
    return result;
});
// const getAllBooksFromDB = async (searchTerm?: string) => {
//   const query: Record<string, unknown> = {};
//   if (searchTerm) {
//     const searchRegex = new RegExp(searchTerm, 'i'); // Case-insensitive search
//     query.$or = [
//       { title: searchRegex },
//       { author: searchRegex },
//       { category: searchRegex },
//     ];
//   }
//   const result = await Product.find(query);
//   return result;
// };
// get all Books data
const getAllBooksFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.Product.find(), query)
        .search(product_constant_1.productSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield productQuery.modelQuery;
    return result;
});
const getSpecificBookFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(productId);
    if (result == null) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Book is not exist');
    }
    return result;
});
const updateBookIntoDB = (productId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExists = yield product_model_1.Product.findById(productId);
    if (!isProductExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'This Book is not found !');
    }
    const result = yield product_model_1.Product.findByIdAndUpdate(productId, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteSpecificBookFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExists = yield product_model_1.Product.findById(productId);
    if (!isProductExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'This Book is not found !');
    }
    const result = yield product_model_1.Product.findByIdAndUpdate(productId, { isDeleted: true }, { new: true });
    return result;
});
exports.productServices = {
    createBookIntoDb,
    getAllBooksFromDB,
    getSpecificBookFromDB,
    updateBookIntoDB,
    deleteSpecificBookFromDB,
};
