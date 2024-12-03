import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    email: { type: String, required: true, trim: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number },
  },
  { timestamps: true }, // Includes `createdAt` and `updatedAt`
);

export const Order = model<TOrder>('Order', orderSchema);
