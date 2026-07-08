import { z } from 'zod';

const createServiceValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    price: z.number().nonnegative({ message: "Price must be a positive number" }),
    categoryId: z.string().uuid({ message: "Valid Category ID is required" }),
  }),
});

const updateServiceValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().nonnegative().optional(),
    categoryId: z.string().uuid().optional(),
  }),
});

export const ServiceValidation = {
  createServiceValidationSchema,
  updateServiceValidationSchema,
};
