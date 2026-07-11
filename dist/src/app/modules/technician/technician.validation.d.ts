import { z } from 'zod';
export declare const TechnicianValidation: {
    updateTechnicianProfileValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            skills: z.ZodOptional<z.ZodArray<z.ZodString>>;
            experience: z.ZodOptional<z.ZodNumber>;
            hourlyRate: z.ZodOptional<z.ZodNumber>;
            bio: z.ZodOptional<z.ZodString>;
            location: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    updateAvailabilityValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            availability: z.ZodArray<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    getAllTechniciansValidationSchema: z.ZodObject<{
        query: z.ZodObject<{
            skill: z.ZodOptional<z.ZodString>;
            location: z.ZodOptional<z.ZodString>;
            minExperience: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
            minRating: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
            search: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    updateBookingStatusValidationSchema: z.ZodObject<{
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
        body: z.ZodObject<{
            status: z.ZodEnum<{
                ACCEPTED: "ACCEPTED";
                DECLINED: "DECLINED";
                IN_PROGRESS: "IN_PROGRESS";
                COMPLETED: "COMPLETED";
            }>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    technicianIdParamValidationSchema: z.ZodObject<{
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=technician.validation.d.ts.map