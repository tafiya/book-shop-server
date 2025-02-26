import express from 'express';
import { auth } from '../../middleware/auth';
import { orderControllers } from './order.controller';

const router = express.Router();
// order a book
router.post('/', auth('User'), orderControllers.orderBook);
// get all the order
router.get('/', auth('User', 'Admin'), orderControllers.getAllOrder);
router.delete('/:orderId', auth('Admin'), orderControllers.deleteOrder);
router.get(
  '/my-orders',
  auth('User', 'Admin'), // ✅ Authenticated users only
  orderControllers.getMyOrder,
);
router.patch(
  '/:orderId/status',
  auth('Admin'),
  orderControllers.updateOrderStatus,
);
// count the total revenue
router.get('/verify', auth('User'), orderControllers.verifyPayment);
router.get('/revenue', auth('Admin', 'User'), orderControllers.totalRevenue);

export const orderRoutes = router;
