import { Request, Response } from 'express';
import { productServices } from './product.service';
import productValidationSchema from './product.validation';
// create a book
const createBook = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    // zod validator
    const zodParseData = productValidationSchema.parse(productData);
    const result = await productServices.createBookIntoDb(zodParseData);
    res.status(200).json({
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Books is not created successfully',
      data: err,
    });
  }
};
// get all books
const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllBooksFromDB();
    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Books is not retrieved successfully',
      data: err,
    });
  }
};
//  Get a Specific Book
const getSpecificBooks = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSpecificBookFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Book is not retrieved successfully',
      data: err,
    });
  }
};
//  Get a Specific Book
const updateBook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateBookData = req.body;
    const result = await productServices.updateBookIntoDB(
      productId,
      updateBookData,
    );
    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Book is not updated successfully',
      data: err,
    });
  }
};
// Delete a Book
const deleteBook = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productServices.deleteSpecificBookFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: {},
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Book is not deleted successfully',
      data: err,
    });
  }
};
export const productControllers = {
  createBook,
  getAllBooks,
  getSpecificBooks,
  updateBook,
  deleteBook,
};
