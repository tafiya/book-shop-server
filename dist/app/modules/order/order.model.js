"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: { type: String, required: true, trim: true },
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
