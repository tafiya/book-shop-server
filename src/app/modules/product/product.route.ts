import express from 'express';
import { productControllers } from './product.controller';

const router = express.Router();
// Create a Book
router.post('/', productControllers.createBook);
//  Get all Book
router.get('/', productControllers.getAllBooks);
//  Get a Specific Book
router.get('/:productId', productControllers.getSpecificBooks);
// Update a Book
router.put('/:productId', productControllers.updateBook);
// Delete a Book
router.delete('/:productId', productControllers.deleteBook);

export const productRoutes = router;
