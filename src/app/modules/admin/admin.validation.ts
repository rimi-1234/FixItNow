import { z } from 'zod';
import { Role, UserStatus, BookingStatus } from '@prisma/client';

const updateUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.BANNED], {
      message: `status must be one of: ${Object.values(UserStatus).join(', ')}`,
    }),
  }),
});

const getAllUsersValidationSchema = z.object({
  query: z.object({
    role: z.enum([Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN]).optional(),
    status: z.enum([UserStatus.ACTIVE, UserStatus.BANNED]).optional(),
    search: z.string().optional(),
  }),
});

const getAllBookingsValidationSchema = z.object({
  query: z.object({
    status: z
      .enum([
        BookingStatus.REQUESTED,
        BookingStatus.ACCEPTED,
        BookingStatus.DECLINED,
        BookingStatus.PAID,
        BookingStatus.IN_PROGRESS,
        BookingStatus.COMPLETED,
        BookingStatus.CANCELLED,
      ])
      .optional(),
  }),
});

export const AdminValidation = {
  updateUserStatusValidationSchema,
  getAllUsersValidationSchema,
  getAllBookingsValidationSchema,
};
