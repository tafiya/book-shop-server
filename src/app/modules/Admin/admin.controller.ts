import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await AdminService.blockUserById(userId);

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: StatusCodes.OK,
  });
});
const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AdminService.deleteProductById(id);
  sendResponse(res, {
    message: 'Product is deleted successfully',
    statusCode: StatusCodes.OK,
  });
});
export const AdminController = {
  blockUser,
  deleteProduct,
};
