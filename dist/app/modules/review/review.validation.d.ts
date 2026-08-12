import { z } from 'zod';
export declare const ReviewValidation: {
    createReviewValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            bookingId: z.ZodString;
            rating: z.ZodNumber;
            comment: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    getLatestReviewsValidationSchema: z.ZodObject<{
        query: z.ZodOptional<z.ZodObject<{
            limit: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number, string | undefined>>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
};
//# sourceMappingURL=review.validation.d.ts.map