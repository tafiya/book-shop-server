import { Request, Response } from 'express';
import { orderServices } from './order.service';

// order a book
const orderBook = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity } = req.body;
    const result = await orderServices.orderBookFromDB(
      email,
      product,
      quantity,
    );

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to place the order',
    });
  }
};
// get all the orders detail
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.getAllOrderFromDb();
    res.status(200).json({
      success: true,
      message: 'All Orders retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'All Orders is not retrieved successfully',
      data: err,
    });
  }
};

// count total revenue
const totalRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderServices.countTotalRevenue();
    res.status(200).json({
      success: true,
      message: 'Revenue calculated successfully',
      data: { totalRevenue },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Books is not retrieved successfully',
      data: err,
    });
  }
};

export const orderControllers = {
  orderBook,
  getAllOrder,
  totalRevenue,
};
