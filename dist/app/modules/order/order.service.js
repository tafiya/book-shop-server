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
exports.orderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
//order a book service
const orderBookFromDB = (email, product, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield product_model_1.Product.findById(product);
    // Explicit null check for the product
    if (book === null) {
        throw new Error('Product not found');
    }
    // Check if there is enough stock
    if (book.quantity < quantity) {
        throw new Error('Insufficient stock for this product');
    }
    // Calculate total price
    const totalPrice = book.price * quantity;
    // Create a new order
    const order = new order_model_1.Order({
        email,
        product: product,
        quantity,
        totalPrice,
    });
    yield order.save();
    // Update product quantity
    book.quantity -= quantity;
    if (book.quantity === 0) {
        book.inStock = false;
    }
    yield book.save();
    return order.toObject();
});
// get all the order service
const getAllOrderFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    return result;
});
// count the total revenue
const countTotalRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const revenueAggregation = yield order_model_1.Order.aggregate([
        {
            $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } },
        },
    ]);
    return revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;
});
exports.orderServices = {
    orderBookFromDB,
    getAllOrderFromDb,
    countTotalRevenue,
};
