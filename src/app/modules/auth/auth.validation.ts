import { z } from 'zod';
import { Role } from '@prisma/client';

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  }),
});

const registerValidationSchema = z.object({
  body: z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    role: z.enum([Role.CUSTOMER, Role.TECHNICIAN]).optional(),
    skills: z.array(z.string()).optional(),
    experience: z.number().int().nonnegative().optional(),
    hourlyRate: z.number().nonnegative().optional(),
    bio: z.string().optional(),
    location: z.string().optional(),
    imageUrl: z
      .string()
      .optional()
      .nullable()
      .transform((value) => {
        const trimmed = typeof value === "string" ? value.trim() : value;
        return trimmed ? trimmed : null;
      })
      .refine(
        (value) =>
          value === null ||
          value.startsWith("/") ||
          value.startsWith("data:image/") ||
          /^https?:\/\//i.test(value),
        { message: "Image must be a URL, site path, or uploaded image" }
      )
      .refine(
        (value) => value === null || value.length <= 1_500_000,
        { message: "Image data is too large" }
      ),
  })
    .refine(
      (data) => {
        if (data.role === Role.TECHNICIAN) {
          return data.skills !== undefined && data.experience !== undefined && data.hourlyRate !== undefined;
        }
        return true;
      },
      {
        message: "Technicians must provide skills, experience, and hourlyRate",
        path: ["role"],
      }
    ),
});

const demoLoginValidationSchema = z.object({
  body: z.object({
    role: z.enum([Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN], {
      message: 'Role must be CUSTOMER, TECHNICIAN, or ADMIN',
    }),
  }),
});

const googleLoginValidationSchema = z.object({
  body: z.object({
    idToken: z.string().min(20, { message: 'Google id token is required' }),
    role: z.enum([Role.CUSTOMER, Role.TECHNICIAN]).optional(),
  }),
});

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, { message: 'Name must be at least 2 characters' })
      .max(80)
      .optional()
      .nullable(),
    phone: z
      .string()
      .trim()
      .regex(/^[+\d\s()-]{7,20}$/, { message: 'Enter a valid phone number' })
      .optional()
      .nullable(),
    imageUrl: z
      .string()
      .trim()
      .max(2000)
      .optional()
      .nullable()
      .refine(
        (value) =>
          value == null ||
          value === '' ||
          value.startsWith('/') ||
          value.startsWith('data:image/') ||
          /^https?:\/\//i.test(value),
        { message: 'Image must be a URL, site path, or uploaded image' }
      ),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  registerValidationSchema,
  demoLoginValidationSchema,
  googleLoginValidationSchema,
  updateProfileValidationSchema,
};
