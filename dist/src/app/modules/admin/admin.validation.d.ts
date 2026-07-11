import { z } from 'zod';
export declare const AdminValidation: {
    updateUserStatusValidationSchema: z.ZodObject<{
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
        body: z.ZodObject<{
            status: z.ZodEnum<{
                ACTIVE: "ACTIVE";
                BANNED: "BANNED";
            }>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    getAllUsersValidationSchema: z.ZodObject<{
        query: z.ZodObject<{
            role: z.ZodOptional<z.ZodEnum<{
                CUSTOMER: "CUSTOMER";
                TECHNICIAN: "TECHNICIAN";
                ADMIN: "ADMIN";
            }>>;
            status: z.ZodOptional<z.ZodEnum<{
                ACTIVE: "ACTIVE";
                BANNED: "BANNED";
            }>>;
            search: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    getAllBookingsValidationSchema: z.ZodObject<{
        query: z.ZodObject<{
            status: z.ZodOptional<z.ZodEnum<{
                REQUESTED: "REQUESTED";
                ACCEPTED: "ACCEPTED";
                DECLINED: "DECLINED";
                PAID: "PAID";
                IN_PROGRESS: "IN_PROGRESS";
                COMPLETED: "COMPLETED";
                CANCELLED: "CANCELLED";
            }>>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    categoryIdParamValidationSchema: z.ZodObject<{
        params: z.ZodObject<{
            id: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=admin.validation.d.ts.map