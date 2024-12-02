import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    title: { type: String, trim: true, required: true, unique: true },
    author: { type: String, trim: true, required: true },
    price: { type: Number, trim: true, required: true },
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
    description: { type: String, trim: true, required: true },
    quantity: { type: Number, trim: true, required: true },
    inStock: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Product = model<TProduct>('Product', productSchema);
