import { z } from 'zod';

// Zod schema for Order validation
export const orderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  product: z.string().nonempty({ message: 'Product ID is required' }), // Assuming product is a MongoDB ObjectId in string form
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
  totalPrice: z.number().optional(),
});

// Type inferred from the Zod schema
export type OrderValidationSchema = z.infer<typeof orderValidationSchema>;
