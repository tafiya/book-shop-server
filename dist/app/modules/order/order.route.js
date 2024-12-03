"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
// order a book
router.post('/create-order', order_controller_1.orderControllers.orderBook);
// get all the order
router.get('/', order_controller_1.orderControllers.getAllOrder);
// count the total revenue
router.get('/revenue', order_controller_1.orderControllers.totalRevenue);
exports.orderRoutes = router;
