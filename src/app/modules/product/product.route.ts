import express from 'express';
import { auth } from '../../middleware/auth';
import { productControllers } from './product.controller';

const router = express.Router();
// Create a Book
router.post(
  '/',
  auth('Admin'),
  // validateRequest(productValidationSchema.createProductValidationSchema),
  productControllers.createBook,
);
//  Get all Book
router.get('/', productControllers.getAllBooks);
//  Get a Specific Book
router.get('/:_id', auth('User', 'Admin'), productControllers.getSpecificBook);
// Update a Book
router.put('/:_id', auth('Admin'), productControllers.updateBook);
// Delete a Book
router.delete('/:_id', auth('Admin'), productControllers.deleteBook);

export const productRoutes = router;
