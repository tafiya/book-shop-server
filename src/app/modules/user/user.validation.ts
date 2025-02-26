import { z } from 'zod';
const userValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    imgURL: z.string().optional(),
    email: z.string().email(),
    role: z.enum(['Admin', 'User']).default('User'),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
