import express from 'express';
import { orderControllers } from './order.controller';

const router = express.Router();
// order a book
router.post('/', orderControllers.orderBook);
// get all the order
router.get('/', orderControllers.getAllOrder);
// count the total revenue
router.get('/revenue', orderControllers.totalRevenue);

export const orderRoutes = router;
