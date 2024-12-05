"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
// Zod schema for Order validation
exports.orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email address' }).trim(),
    product: zod_1.z.string().nonempty({ message: 'Product ID is required' }), // Assuming product is a MongoDB ObjectId in string form
    quantity: zod_1.z.number().min(1, { message: 'Quantity must be at least 1' }),
    totalPrice: zod_1.z.number().optional(),
});
