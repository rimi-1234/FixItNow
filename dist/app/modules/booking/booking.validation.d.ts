import { z } from 'zod';
export declare const BookingValidation: {
    createBookingValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            technicianId: z.ZodString;
            serviceId: z.ZodString;
            scheduledTime: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
    bookingIdParamValidationSchema: z.ZodObject<{
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=booking.validation.d.ts.map