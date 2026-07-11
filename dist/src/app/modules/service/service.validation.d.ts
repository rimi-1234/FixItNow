import { z } from 'zod';
export declare const ServiceValidation: {
    createServiceValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodString;
            description: z.ZodString;
            price: z.ZodNumber;
            categoryId: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    updateServiceValidationSchema: z.ZodObject<{
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
        body: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            price: z.ZodOptional<z.ZodNumber>;
            categoryId: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    getAllServicesValidationSchema: z.ZodObject<{
        query: z.ZodObject<{
            type: z.ZodOptional<z.ZodString>;
            location: z.ZodOptional<z.ZodString>;
            minRating: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
            minPrice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
            maxPrice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
            search: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    serviceIdParamValidationSchema: z.ZodObject<{
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=service.validation.d.ts.map