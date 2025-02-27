"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// Create a Book
router.post('/', (0, auth_1.auth)('Admin'), 
// validateRequest(productValidationSchema.createProductValidationSchema),
product_controller_1.productControllers.createBook);
//  Get all Book
router.get('/', product_controller_1.productControllers.getAllBooks);
//  Get a Specific Book
router.get('/:_id', (0, auth_1.auth)('User', 'Admin'), product_controller_1.productControllers.getSpecificBook);
// Update a Book
router.put('/:_id', (0, auth_1.auth)('Admin'), product_controller_1.productControllers.updateBook);
// Delete a Book
router.delete('/:_id', (0, auth_1.auth)('Admin'), product_controller_1.productControllers.deleteBook);
exports.productRoutes = router;
