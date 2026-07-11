import { z } from 'zod';
export declare const AuthValidation: {
    loginValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            email: z.ZodString;
            password: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    registerValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            email: z.ZodString;
            password: z.ZodString;
            role: z.ZodOptional<z.ZodEnum<{
                CUSTOMER: "CUSTOMER";
                TECHNICIAN: "TECHNICIAN";
            }>>;
            skills: z.ZodOptional<z.ZodArray<z.ZodString>>;
            experience: z.ZodOptional<z.ZodNumber>;
            hourlyRate: z.ZodOptional<z.ZodNumber>;
            bio: z.ZodOptional<z.ZodString>;
            location: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=auth.validation.d.ts.map