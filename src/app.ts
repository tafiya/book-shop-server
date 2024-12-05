import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { orderRoutes } from './app/modules/order/order.route';
import { productRoutes } from './app/modules/product/product.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
const getAController = (req: Request, res: Response) => {
  res.json({
    message: 'get the data',
  });
};
app.get('/', getAController);

export default app;
