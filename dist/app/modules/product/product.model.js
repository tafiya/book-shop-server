"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    title: { type: String, trim: true, required: true, unique: true },
    author: { type: String, trim: true, required: true },
    price: { type: Number, trim: true, required: true },
    category: {
        type: String,
        trim: true,
        enum: {
            values: [
                'Fiction',
                'Science',
                'SelfDevelopment',
                'Poetry',
                'Religious',
            ],
            message: '{values} is not supported',
        },
    },
    description: { type: String, trim: true, required: true },
    quantity: { type: Number, trim: true, required: true },
    inStock: { type: Boolean, default: false },
}, { timestamps: true });
exports.Product = (0, mongoose_1.model)('Product', productSchema);
