import { z } from 'zod';
const createReviewValidationSchema = z.object({
    body: z.object({
        bookingId: z.string({ message: "Booking ID is required" }).uuid({ message: "Invalid booking ID" }),
        rating: z.number({ message: "Rating is required" }).min(1, { message: "Rating must be at least 1" }).max(5, { message: "Rating must be at most 5" }),
        comment: z.string().optional()
    }),
});
const getLatestReviewsValidationSchema = z.object({
    query: z.object({
        limit: z
            .string()
            .optional()
            .transform((v) => (v ? Number(v) : 6))
            .refine((v) => Number.isFinite(v) && v >= 1 && v <= 24, {
            message: 'limit must be between 1 and 24',
        }),
    }).optional(),
});
export const ReviewValidation = {
    createReviewValidationSchema,
    getLatestReviewsValidationSchema,
};
//# sourceMappingURL=review.validation.js.map