import { z } from 'zod';

const updateTechnicianProfileValidationSchema = z.object({
  body: z.object({
    skills: z.array(z.string()).optional(),
    experience: z.number().int().nonnegative().optional(),
    hourlyRate: z.number().nonnegative().optional(),
    bio: z.string().optional(),
    location: z.string().optional(),
  }),
});

const updateAvailabilityValidationSchema = z.object({
  body: z.object({
    availability: z.array(z.string(), {
      message: 'availability must be an array of time slot strings',
    }),
  }),
});

const getAllTechniciansValidationSchema = z.object({
  query: z.object({
    skill: z.string().optional(),
    location: z.string().optional(),
    minExperience: z.coerce.number().int().nonnegative().optional(),
    minRating: z.coerce.number().min(0).max(5).optional(),
    search: z.string().optional(),
  }),
});

export const TechnicianValidation = {
  updateTechnicianProfileValidationSchema,
  updateAvailabilityValidationSchema,
  getAllTechniciansValidationSchema,
};
