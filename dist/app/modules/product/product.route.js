"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
// Create a Book
router.post('/', product_controller_1.productControllers.createBook);
//  Get all Book
router.get('/', product_controller_1.productControllers.getAllBooks);
//  Get a Specific Book
router.get('/:productId', product_controller_1.productControllers.getSpecificBooks);
// Update a Book
router.put('/:productId', product_controller_1.productControllers.updateBook);
// Delete a Book
router.delete('/:productId', product_controller_1.productControllers.deleteBook);
exports.productRoutes = router;
