import prisma from '../../../lib/prisma.js';
import { IReviewCreatePayload } from './review.interface.js';

const createReview = async (customerId: string, payload: IReviewCreatePayload) => {
  // Check if booking exists
  const booking = await prisma.booking.findUnique({
    where: { id: payload.bookingId },
    include: { review: true }
  });

  if (!booking) throw new Error('Booking not found');

  // Check if it's the customer's booking
  if (booking.customerId !== customerId) {
    throw new Error('You can only review your own bookings');
  }

  // Check if the booking is completed
  if (booking.status !== 'COMPLETED') {
    throw new Error('You can only review completed jobs');
  }

  // Check if already reviewed
  if (booking.review) {
    throw new Error('This booking has already been reviewed');
  }

  // Create review
  const review = await prisma.review.create({
    data: {
      bookingId: payload.bookingId,
      customerId,
      technicianId: booking.technicianId,
      rating: payload.rating,
      comment: payload.comment
    }
  });

  return review;
};

export const ReviewServices = {
  createReview
};
