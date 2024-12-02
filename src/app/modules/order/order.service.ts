import { Product } from '../product/product.model';
import { Order } from './order.model';

//order a book service
const orderBookFromDB = async (
  email: string,
  product: string,
  quantity: number,
) => {
  const book = await Product.findById(product);
  // Explicit null check for the product
  if (book === null) {
    const error = new Error('Product not found');
    (error as any).statusCode = 404;
    throw error;
  }
  // Check if there is enough stock
  if (book.quantity < quantity) {
    const error = new Error('Insufficient stock for this product');
    (error as any).statusCode = 400;
    throw error;
  }

  // Calculate total price
  const totalPrice = book.price * quantity;

  // Create a new order
  const order = new Order({
    email,
    product: product,
    quantity,
    totalPrice,
  });
  await order.save();

  // Update product quantity
  book.quantity -= quantity;
  if (book.quantity === 0) {
    book.inStock = false;
  }
  await book.save();
  return order.toObject();
};
// get all the order service
const getAllOrderFromDb = async () => {
  const result = await Order.find();
  return result;
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

export const orderServices = {
  orderBookFromDB,
  getAllOrderFromDb,
  countTotalRevenue,
};
