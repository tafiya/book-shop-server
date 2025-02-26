import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const getAllUsersFromDB = async () => {
  const result = await User.find();

  return result;
};
const updateUserIntoDB = async (userId: string, payload: Partial<TUser>) => {
  const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This Book is not found !');
  }
  const result = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteSpecificUserFromDB = async (userId: string) => {
  const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This User is not found !');
  }
  const result = await User.findByIdAndUpdate(
    userId,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
export const userServices = {
  getAllUsersFromDB,
  updateUserIntoDB,
  deleteSpecificUserFromDB,
};
