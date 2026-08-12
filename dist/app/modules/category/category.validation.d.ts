import { z } from 'zod';
export declare const CategoryValidation: {
    createCategoryValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodString;
            slug: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    updateCategoryValidationSchema: z.ZodObject<{
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
        body: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            slug: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    categoryIdParamValidationSchema: z.ZodObject<{
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=category.validation.d.ts.map