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
exports.orderControllers = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const order_service_1 = require("./order.service");
// order a book
const orderBook = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const order = yield order_service_1.orderServices.createOrder(user, req.body, req.ip);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: 'Order placed successfully',
        data: order,
    });
}));
// get all the orders detail
const getAllOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.params;
    const result = yield order_service_1.orderServices.getAllOrderFromDb(payload);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: 'Order placed successfully',
        data: result,
    });
}));
// update order
const updateOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const result = yield order_service_1.orderServices.updateOrderIntoDB(orderId, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Order updated successfully',
        data: result,
    });
}));
const deleteOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const result = yield order_service_1.orderServices.deleteOrderFromDB(orderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Order is deleted successfully',
        data: result,
    });
}));
// verify payment
const verifyPayment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.orderServices.verifyPayment(req.query.order_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: 'Order verified successfully',
        data: order,
    });
}));
// count total revenue
const totalRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield order_service_1.orderServices.countTotalRevenue();
        res.status(200).json({
            success: true,
            message: 'Revenue calculated successfully',
            data: { totalRevenue },
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
const getMyOrder = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    //console.log(req.user);
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // ✅ Extract logged-in user ID
    const role = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role; // ✅ Extract user role
    if (!userId) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'User no found');
    }
    const result = yield order_service_1.orderServices.getMyOrder(userId, role);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Order retrieved successfully',
        data: result,
    });
}));
const updateOrderStatus = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const { status } = req.body;
    const result = yield order_service_1.orderServices.updateOrderIntoDB(orderId, {
        status,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Order status updated successfully',
        data: result,
    });
}));
exports.orderControllers = {
    orderBook,
    getAllOrder,
    totalRevenue,
    verifyPayment,
    updateOrder,
    deleteOrder,
    getMyOrder,
    updateOrderStatus,
};
