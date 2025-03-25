import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { productServices } from './product.service';
// create a book

const createBook = catchAsync(async (req, res) => {
  const result = await productServices.createBookIntoDb(req.body);
  sendResponse(res, {
    message: 'Book is created successfully',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

// get all book.
const getAllBooks = catchAsync(async (req, res) => {
  const result = await productServices.getAllBooksFromDB(req.query);
  sendResponse(res, {
    message: 'Blogs fetched successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
//  Get a Specific Book
const getSpecificBook = catchAsync(async (req, res) => {
  const { _id } = req.params;

  const result = await productServices.getSpecificBookFromDB(_id);
  sendResponse(res, {
    message: 'Book fetched successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
// update a book
const updateBook = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await productServices.updateBookIntoDB(_id, req.body);
  sendResponse(res, {
    message: 'Book is updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});

// Delete a Book
const deleteBook = catchAsync(async (req, res) => {
  const { _id } = req.params;
  await productServices.deleteSpecificBookFromDB(_id);
  sendResponse(res, {
    message: 'Book is  deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

export const productControllers = {
  createBook,
  getAllBooks,
  getSpecificBook,
  updateBook,
  deleteBook,
};
