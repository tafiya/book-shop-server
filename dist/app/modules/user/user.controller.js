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
exports.userControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_service_1 = require("./user.service");
const getAllUsers = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.getAllUsersFromDB();
    (0, sendResponse_1.default)(res, {
        message: 'User fetched successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const result = yield user_service_1.userServices.updateUserIntoDB(_id, req.body);
    (0, sendResponse_1.default)(res, {
        message: 'User is updated successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    yield user_service_1.userServices.deleteSpecificUserFromDB(_id);
    (0, sendResponse_1.default)(res, {
        message: 'User is  deleted successfully',
        statusCode: http_status_codes_1.StatusCodes.OK,
    });
}));
exports.userControllers = {
    getAllUsers,
    updateUser,
    deleteUser,
};
