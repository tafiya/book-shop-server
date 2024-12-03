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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productServices = void 0;
const product_model_1 = require("./product.model");
const createBookIntoDb = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new product_model_1.Product(productData);
    const result = yield product.save();
    return result.toObject();
});
const getAllBooksFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
const getSpecificBookFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(productId);
    return result;
});
const updateBookIntoDB = (productId, updateBookData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(productId, updateBookData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteSpecificBookFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(productId);
    return result;
});
exports.productServices = {
    createBookIntoDb,
    getAllBooksFromDB,
    getSpecificBookFromDB,
    updateBookIntoDB,
    deleteSpecificBookFromDB,
};
