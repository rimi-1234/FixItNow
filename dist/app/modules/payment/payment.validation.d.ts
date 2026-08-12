import { z } from 'zod';
export declare const PaymentValidation: {
    createPaymentValidationSchema: z.ZodObject<{
        body: z.ZodObject<{
            bookingId: z.ZodString;
            provider: z.ZodOptional<z.ZodEnum<{
                STRIPE: "STRIPE";
                SSLCOMMERZ: "SSLCOMMERZ";
            }>>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    paymentIdParamValidationSchema: z.ZodObject<{
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=payment.validation.d.ts.map