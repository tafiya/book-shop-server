import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';

import { Product } from '../product/product.model';
import { User } from '../user/user.model';

const blockUserById = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
};

const deleteProductById = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'product not found');
  }
  await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

export const AdminService = {
  blockUserById,
  deleteProductById,
};
