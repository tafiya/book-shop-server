// order.service.ts

import { StatusCodes } from 'http-status-codes';

import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';

import QueryBuilder from '../../builder/QueryBuilder';
import { IOrder } from './order.interface';
import Order from './order.model';
import { orderUtils } from './order.utils';

//order a book service
const createOrder = async (
  user: JwtPayload,
  payload: { products: { product: string; quantity: number }[] },
  client_ip: string,
) => {
  // const customer = await User.findOne(user.email);
  // console.log('paylod', payload);
  // if (!customer) {
  //   throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  // }

  // if (customer.role === 'Admin') {
  //   throw new AppError(StatusCodes.FORBIDDEN, 'Admins cannot place orders');
  // }
  if (!payload?.products?.length)
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Order is not specified');

  const products = payload.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Product.findById(item.product);
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    }),
  );

  let order = await Order.create({
    user,
    products: productDetails,
    totalPrice,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: user.address,
    customer_email: user.email,
    customer_phone: user.phone,
    customer_city: user.address,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};
// get all the order service
const getAllOrderFromDb = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    Order.find()
      .populate({
        path: 'products.product', // Ensures each product inside the products array is fully populated
      })
      .populate('user'),
    query,
  )
    .search(['products.product.title'])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await orderQuery.modelQuery;
  return result;
};
// update order
const updateOrderIntoDB = async (id: string, payload: Partial<IOrder>) => {
  const result = await Order.findOneAndUpdate(
    {
      _id: id,
    },
    payload,
    {
      new: true,
    },
  );
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }
  return result;
};
// delete order
const deleteOrderFromDB = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }
  return result;
  //console.log(result);
};
const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

// count the total revenue
const countTotalRevenue = async (): Promise<number> => {
  const revenueAggregation = await Order.aggregate([
    {
      $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } },
    },
  ]);
  return revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;
};

// get my order
const getMyOrder = async (userId: string, role: string) => {
  if (role === 'admin') {
    // ✅ Admin can see all orders
    return await Order.find().populate('product user');
  } else {
    // ✅ Customers can only see their own orders
    return await Order.find({ user: userId }).populate('product');
  }
};
export const orderServices = {
  createOrder,
  getAllOrderFromDb,
  countTotalRevenue,
  verifyPayment,
  updateOrderIntoDB,
  deleteOrderFromDB,
  getMyOrder,
};
