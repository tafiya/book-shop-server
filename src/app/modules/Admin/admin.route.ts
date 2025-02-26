import express from 'express';
import { auth } from '../../middleware/auth';
import { AdminController } from './admin.controller';

const router = express.Router();

router.patch('/users/:userId/block', auth('Admin'), AdminController.blockUser);
router.delete('/products/:id', auth('Admin'), AdminController.deleteProduct);

export const adminRoutes = router;
