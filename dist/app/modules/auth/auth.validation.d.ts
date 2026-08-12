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
            imageUrl: z.ZodPipe<z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodTransform<string | null, string | null | undefined>>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    demoLoginValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            role: z.ZodEnum<{
                CUSTOMER: "CUSTOMER";
                TECHNICIAN: "TECHNICIAN";
                ADMIN: "ADMIN";
            }>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    googleLoginValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            idToken: z.ZodString;
            role: z.ZodOptional<z.ZodEnum<{
                CUSTOMER: "CUSTOMER";
                TECHNICIAN: "TECHNICIAN";
            }>>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    updateProfileValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            phone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            imageUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=auth.validation.d.ts.map