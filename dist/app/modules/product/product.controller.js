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
exports.productControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
// create a book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product: productData } = req.body;
        // zod validator
        const zodParseData = product_validation_1.default.parse(productData);
        const result = yield product_service_1.productServices.createBookIntoDb(zodParseData);
        res.status(200).json({
            success: true,
            message: 'Book created successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Books is not created successfully',
            data: err,
        });
    }
});
// get all books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productServices.getAllBooksFromDB();
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Books is not retrieved successfully',
            data: err,
        });
    }
});
//  Get a Specific Book
const getSpecificBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productServices.getSpecificBookFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Book is not retrieved successfully',
            data: error,
        });
    }
});
//  Get a Specific Book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateBookData = req.body;
        const result = yield product_service_1.productServices.updateBookIntoDB(productId, updateBookData);
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Book is not updated successfully',
            data: err,
        });
    }
});
// Delete a Book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield product_service_1.productServices.deleteSpecificBookFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: {},
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Book is not deleted successfully',
            data: err,
        });
    }
});
exports.productControllers = {
    createBook,
    getAllBooks,
    getSpecificBooks,
    updateBook,
    deleteBook,
};
