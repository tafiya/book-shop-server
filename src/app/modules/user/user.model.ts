import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../config';
import { TUser, UserModel } from './user.interface';
const userSchema = new Schema<TUser>(
  {
    name: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    userImg: { type: String, default: '' },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' },
    isBlocked: { type: Boolean, default: false },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
// pre middleware function
// using to hide the original password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salts_round),
  );
  next();
});

//  hide to save the password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
userSchema.statics.isUserExistsByCustomId = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};
// for check password
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
// this middleware is used to hide the deleted data from searching individual
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// this middleware is used to hide the deleted data from searching individual
userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
userSchema.pre('findOneAndUpdate', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
export const User = model<TUser, UserModel>('User', userSchema);
