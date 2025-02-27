"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
// order a book
router.post('/', (0, auth_1.auth)('User'), order_controller_1.orderControllers.orderBook);
// get all the order
router.get('/', (0, auth_1.auth)('User', 'Admin'), order_controller_1.orderControllers.getAllOrder);
router.delete('/:orderId', (0, auth_1.auth)('Admin'), order_controller_1.orderControllers.deleteOrder);
router.get('/my-orders', (0, auth_1.auth)('User', 'Admin'), // ✅ Authenticated users only
order_controller_1.orderControllers.getMyOrder);
router.patch('/:orderId/status', (0, auth_1.auth)('Admin'), order_controller_1.orderControllers.updateOrderStatus);
// count the total revenue
router.get('/verify', (0, auth_1.auth)('User'), order_controller_1.orderControllers.verifyPayment);
router.get('/revenue', (0, auth_1.auth)('Admin', 'User'), order_controller_1.orderControllers.totalRevenue);
exports.orderRoutes = router;
