"use strict";
// order.service.ts
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
exports.orderServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("../product/product.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const order_model_1 = __importDefault(require("./order.model"));
const order_utils_1 = require("./order.utils");
//order a book service
const createOrder = (user, payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    // const customer = await User.findOne(user.email);
    // console.log('paylod', payload);
    // if (!customer) {
    //   throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    // }
    var _a;
    // if (customer.role === 'Admin') {
    //   throw new AppError(StatusCodes.FORBIDDEN, 'Admins cannot place orders');
    // }
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.products) === null || _a === void 0 ? void 0 : _a.length))
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, 'Order is not specified');
    const products = payload.products;
    let totalPrice = 0;
    const productDetails = yield Promise.all(products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_model_1.Product.findById(item.product);
        if (product) {
            const subtotal = product ? (product.price || 0) * item.quantity : 0;
            totalPrice += subtotal;
            return item;
        }
    })));
    let order = yield order_model_1.default.create({
        user,
        products: productDetails,
        totalPrice,
    });
    // payment integration
    const shurjopayPayload = {
        amount: totalPrice,
        order_id: order._id,
        currency: 'BDT',
        customer_name: user.name,
        customer_address: user.address,
        customer_email: user.email,
        customer_phone: user.phone,
        customer_city: user.address,
        client_ip,
    };
    const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        order = yield order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }
    return payment.checkout_url;
});
// get all the order service
const getAllOrderFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const orderQuery = new QueryBuilder_1.default(order_model_1.default.find()
        .populate({
        path: 'products.product', // Ensures each product inside the products array is fully populated
    })
        .populate('user'), query)
        .search(['products.product.title'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield orderQuery.modelQuery;
    return result;
});
// update order
const updateOrderIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findOneAndUpdate({
        _id: id,
    }, payload, {
        new: true,
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Order not found');
    }
    return result;
});
// delete order
const deleteOrderFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Order not found');
    }
    return result;
    //console.log(result);
});
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
        yield order_model_1.default.findOneAndUpdate({
            'transaction.id': order_id,
        }, {
            'transaction.bank_status': verifiedPayment[0].bank_status,
            'transaction.sp_code': verifiedPayment[0].sp_code,
            'transaction.sp_message': verifiedPayment[0].sp_message,
            'transaction.transactionStatus': verifiedPayment[0].transaction_status,
            'transaction.method': verifiedPayment[0].method,
            'transaction.date_time': verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == 'Success'
                ? 'Paid'
                : verifiedPayment[0].bank_status == 'Failed'
                    ? 'Pending'
                    : verifiedPayment[0].bank_status == 'Cancel'
                        ? 'Cancelled'
                        : '',
        });
    }
    return verifiedPayment;
});
// count the total revenue
const countTotalRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const revenueAggregation = yield order_model_1.default.aggregate([
        {
            $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } },
        },
    ]);
    return revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;
});
// get my order
const getMyOrder = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (role === 'admin') {
        // ✅ Admin can see all orders
        return yield order_model_1.default.find().populate('product user');
    }
    else {
        // ✅ Customers can only see their own orders
        return yield order_model_1.default.find({ user: userId }).populate('product');
    }
});
exports.orderServices = {
    createOrder,
    getAllOrderFromDb,
    countTotalRevenue,
    verifyPayment,
    updateOrderIntoDB,
    deleteOrderFromDB,
    getMyOrder,
};
