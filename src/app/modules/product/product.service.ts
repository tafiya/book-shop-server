import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { productSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';

// const createBookIntoDb = async (productData: TProduct) => {
//   const product = new Product(productData);
//   const result = await product.save();
//   return result.toObject();
// };
const createBookIntoDb = async (payload: TProduct) => {
  // const user = await User.isUserExistsByCustomId(userData.email);
  // if (user.isBlocked) {
  //   throw new AppError(
  //     StatusCodes.UNAUTHORIZED,
  //     'You are not authorized to create Book',
  //   );
  // }

  const result = await Product.create(payload);
  return result;
};
// const getAllBooksFromDB = async (searchTerm?: string) => {
//   const query: Record<string, unknown> = {};
//   if (searchTerm) {
//     const searchRegex = new RegExp(searchTerm, 'i'); // Case-insensitive search
//     query.$or = [
//       { title: searchRegex },
//       { author: searchRegex },
//       { category: searchRegex },
//     ];
//   }
//   const result = await Product.find(query);
//   return result;
// };
// get all Books data
const getAllBooksFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;

  return result;
};
const getSpecificBookFromDB = async (productId: string) => {
  const result = await Product.findById(productId);
  if (result == null) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Book is not exist');
  }
  return result;
};
const updateBookIntoDB = async (
  productId: string,
  payload: Partial<TProduct>,
) => {
  const isProductExists = await Product.findById(productId);
  if (!isProductExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This Book is not found !');
  }
  const result = await Product.findByIdAndUpdate(productId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteSpecificBookFromDB = async (productId: string) => {
  const isProductExists = await Product.findById(productId);
  if (!isProductExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This Book is not found !');
  }
  const result = await Product.findByIdAndUpdate(
    productId,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const productServices = {
  createBookIntoDb,
  getAllBooksFromDB,
  getSpecificBookFromDB,
  updateBookIntoDB,
  deleteSpecificBookFromDB,
};
