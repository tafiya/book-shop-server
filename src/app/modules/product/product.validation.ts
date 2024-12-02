import { z } from 'zod';

// Zod schema for product validation
export const productValidationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Title is required' })
    .max(30, { message: 'Title cannot exceed 30 characters' }),
  author: z
    .string()
    .trim()
    .min(1, { message: 'Author is required' })
    .max(30, { message: 'Author name cannot exceed 100 characters' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  category: z.enum(
    ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
    {
      errorMap: () => ({ message: 'Invalid category provided' }),
    },
  ),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Description is required' })
    .max(500, { message: 'Description cannot exceed 500 characters' }),
  quantity: z
    .number()
    .min(1, { message: 'Quantity must be at least 1' })
    .max(10000, { message: 'Quantity cannot exceed 10,000' }),
  inStock: z.boolean(), // Optional since it has a default value
});

// TypeScript inference for the validated schema
export default productValidationSchema;
