import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsersFromDB();
  sendResponse(res, {
    message: 'User fetched successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await userServices.updateUserIntoDB(_id, req.body);
  sendResponse(res, {
    message: 'User is updated successfully',
    statusCode: StatusCodes.OK,
    data: result,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const { _id } = req.params;
  await userServices.deleteSpecificUserFromDB(_id);
  sendResponse(res, {
    message: 'User is  deleted successfully',
    statusCode: StatusCodes.OK,
  });
});
export const userControllers = {
  getAllUsers,
  updateUser,
  deleteUser,
};
