import { z } from 'zod';

const updateTechnicianProfileValidationSchema = z.object({
  body: z.object({
    skills: z.array(z.string()).optional(),
    experience: z.number().int().nonnegative().optional(),
    hourlyRate: z.number().nonnegative().optional(),
    bio: z.string().optional(),
  }),
});

export const TechnicianValidation = {
  updateTechnicianProfileValidationSchema,
};
