import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    title: { type: String, trim: true },
    author: { type: String, trim: true },
    price: { type: Number, trim: true },
    category: {
      type: String,
      trim: true,
      enum: {
        values: [
          'Fiction',
          'Science',
          'SelfDevelopment',
          'Poetry',
          'Religious',
        ],
        message: '{values} is not supported',
      },
    },
    imgURL: { type: String, default: '' },
    description: { type: String, trim: true },
    quantity: { type: Number, trim: true },
    inStock: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// middleware for delate
// this middleware is used to hide the deleted data from showing main data
productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
// this middleware is used to hide the deleted data from searching individual
productSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
productSchema.pre('findOneAndUpdate', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
export const Product = model<TProduct>('Product', productSchema);
