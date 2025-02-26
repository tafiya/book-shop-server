import { Document, Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser extends Document {
  _id: Types.ObjectId; // MongoDB ObjectId
  name: string;
  address: string;
  phone: string;
  userImg: string;
  email: string;
  password: string; // Optional, since it may not be needed in every scenario
  role: 'User' | 'Admin'; // Restricting to specific roles
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
export type TUserRole = keyof typeof USER_ROLE;
