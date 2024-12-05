import { TProduct } from './product.interface';
import { Product } from './product.model';

const createBookIntoDb = async (productData: TProduct) => {
  const product = new Product(productData);
  const result = await product.save();
  return result.toObject();
};
const getAllBooksFromDB = async (searchTerm?: string) => {
  const query: Record<string, unknown> = {};
  if (searchTerm) {
    const searchRegex = new RegExp(searchTerm, 'i'); // Case-insensitive search
    query.$or = [
      { title: searchRegex },
      { author: searchRegex },
      { category: searchRegex },
    ];
  }
  const result = await Product.find(query);
  return result;
};
const getSpecificBookFromDB = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};
const updateBookIntoDB = async (
  productId: string,
  updateBookData: Partial<TProduct>,
) => {
  const result = await Product.findByIdAndUpdate(productId, updateBookData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteSpecificBookFromDB = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

export const productServices = {
  createBookIntoDb,
  getAllBooksFromDB,
  getSpecificBookFromDB,
  updateBookIntoDB,
  deleteSpecificBookFromDB,
};
