import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderServices } from './order.service';

// order a book
const orderBook = catchAsync(async (req, res) => {
  const user = req.user;
  const order = await orderServices.createOrder(user, req.body, req.ip!);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Order placed successfully',
    data: order,
  });
});
// get all the orders detail
const getAllOrder = catchAsync(async (req, res) => {
  const payload = req.params;
  const result = await orderServices.getAllOrderFromDb(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Order placed successfully',
    data: result,
  });
});
// update order
const updateOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await orderServices.updateOrderIntoDB(orderId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order updated successfully',
    data: result,
  });
});
const deleteOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await orderServices.deleteOrderFromDB(orderId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order is deleted successfully',
    data: result,
  });
});
// verify payment
const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderServices.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Order verified successfully',
    data: order,
  });
});

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
const getMyOrder = catchAsync(async (req, res) => {
  //console.log(req.user);
  const userId = req.user?.id; // ✅ Extract logged-in user ID
  const role = req.user?.role; // ✅ Extract user role

  if (!userId) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User no found');
  }

  const result = await orderServices.getMyOrder(userId, role as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  });
});
const updateOrderStatus = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const result = await orderServices.updateOrderIntoDB(orderId, {
    status,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order status updated successfully',
    data: result,
  });
});

export const orderControllers = {
  orderBook,
  getAllOrder,
  totalRevenue,
  verifyPayment,
  updateOrder,
  deleteOrder,
  getMyOrder,
  updateOrderStatus,
};
