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
exports.orderControllers = void 0;
const order_service_1 = require("./order.service");
// order a book
const orderBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, product, quantity } = req.body;
        const result = yield order_service_1.orderServices.orderBookFromDB(email, product, quantity);
        // Return success response
        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to place the order',
        });
    }
});
// get all the orders detail
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.orderServices.getAllOrderFromDb();
        res.status(200).json({
            success: true,
            message: 'All Orders retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'All Orders is not retrieved successfully',
            data: err,
        });
    }
});
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
exports.orderControllers = {
    orderBook,
    getAllOrder,
    totalRevenue,
};
