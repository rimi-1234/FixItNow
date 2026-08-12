import { z } from 'zod';
/** Shared Zod schema for routes with a UUID `:id` path param. */
export declare const uuidParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=validation.d.ts.map