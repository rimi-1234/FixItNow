import prisma from '../../../lib/prisma.js';
import { IReviewCreatePayload } from './review.interface.js';
import type { IReviewLatestItem } from './review.interface.js';

const httpError = (message: string, statusCode: number) =>
  Object.assign(new Error(message), { statusCode });

const createReview = async (customerId: string, payload: IReviewCreatePayload) => {
  const booking = await prisma.booking.findUnique({
    where: { id: payload.bookingId },
    include: { review: true },
  });

  if (!booking) throw httpError('Booking not found', 404);

  if (booking.customerId !== customerId) {
    throw httpError('You can only review your own bookings', 403);
  }

  if (booking.status !== 'COMPLETED') {
    throw httpError('You can only review completed jobs', 400);
  }

  if (booking.review) {
    throw httpError('This booking has already been reviewed', 400);
  }

  const review = await prisma.review.create({
    data: {
      bookingId: payload.bookingId,
      customerId,
      technicianId: booking.technicianId,
      rating: payload.rating,
      comment: payload.comment,
    },
  });

  return review;
};

const getLatestReviews = async (limit: number = 6) => {
  const safeLimit = Math.max(1, Math.min(24, limit));

  const reviews = await prisma.review.findMany({
    take: safeLimit,
    orderBy: { createdAt: 'desc' },
    where: {
      // Only show reviews where the related job is completed (defensive)
      booking: {
        status: 'COMPLETED',
      },
    },
    include: {
      customer: {
        select: { id: true, email: true, name: true },
      },
      booking: {
        select: {
          id: true,
        },
      },
    },
  });

  // Normalize to frontend-friendly shape
  const result: IReviewLatestItem[] = reviews.map((r) => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment ?? null,
    createdAt: r.createdAt.toISOString(),
    customer: {
      id: r.customer.id,
      email: r.customer.email,
      name: (r.customer as any).name ?? null,
    },
  }));

  return result;
};

export const ReviewServices = {
  createReview,
  getLatestReviews,
};
