"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = exports.createProductValidationSchema = void 0;
const zod_1 = require("zod");
// Zod schema for product validation
exports.createProductValidationSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .trim()
        .min(1, { message: 'Title is required' })
        .max(30, { message: 'Title cannot exceed 30 characters' }),
    author: zod_1.z
        .string()
        .trim()
        .min(1, { message: 'Author is required' })
        .max(30, { message: 'Author name cannot exceed 100 characters' }),
    price: zod_1.z.number().positive({ message: 'Price must be a positive number' }),
    category: zod_1.z.enum(['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'], {
        errorMap: () => ({ message: 'Invalid category provided' }),
    }),
    description: zod_1.z
        .string()
        .trim()
        .min(1, { message: 'Description is required' })
        .max(500, { message: 'Description cannot exceed 500 characters' }),
    quantity: zod_1.z
        .number()
        .min(1, { message: 'Quantity must be at least 1' })
        .max(10000, { message: 'Quantity cannot exceed 10,000' }),
    imgURL: zod_1.z.string().optional(),
    inStock: zod_1.z.boolean(),
    isDeleted: zod_1.z.boolean().optional().default(false),
    // Optional since it has a default value
});
// TypeScript inference for the validated schema
exports.productValidationSchema = { createProductValidationSchema: exports.createProductValidationSchema };
