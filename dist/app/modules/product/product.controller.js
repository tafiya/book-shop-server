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
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const product_service_1 = require("./product.service");
// create a book
const createBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productServices.createBookIntoDb(req.body);
    (0, sendResponse_1.default)(res, {
        message: 'Book is created successfully',
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: result,
    });
}));
// get all book.
const getAllBooks = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productServices.getAllBooksFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        message: 'Blogs fetched successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
//  Get a Specific Book
const getSpecificBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const result = yield product_service_1.productServices.getSpecificBookFromDB(_id);
    (0, sendResponse_1.default)(res, {
        message: 'Book fetched successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
// update a book
const updateBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const result = yield product_service_1.productServices.updateBookIntoDB(_id, req.body);
    (0, sendResponse_1.default)(res, {
        message: 'Book is updated successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
// Delete a Book
const deleteBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    yield product_service_1.productServices.deleteSpecificBookFromDB(_id);
    (0, sendResponse_1.default)(res, {
        message: 'Book is  deleted successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
}));
exports.productControllers = {
    createBook,
    getAllBooks,
    getSpecificBook,
    updateBook,
    deleteBook,
};
