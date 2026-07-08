import prisma from '../../../lib/prisma.js';
import { IBookingCreatePayload } from './booking.interface.js';

const createBooking = async (customerId: string, payload: IBookingCreatePayload) => {
  // Check if technician exists and is a technician
  const technician = await prisma.user.findUnique({
    where: { id: payload.technicianId, role: 'TECHNICIAN' }
  });
  if (!technician) throw new Error('Technician not found');

  // Check if service exists
  const service = await prisma.service.findUnique({
    where: { id: payload.serviceId }
  });
  if (!service) throw new Error('Service not found');

  // Ensure service belongs to this technician
  if (service.technicianId !== payload.technicianId) {
    throw new Error('This service is not offered by the selected technician');
  }

  const booking = await prisma.booking.create({
    data: {
      customerId,
      technicianId: payload.technicianId,
      serviceId: payload.serviceId,
      scheduledTime: new Date(payload.scheduledTime),
      status: 'REQUESTED'
    },
    include: {
      technician: { select: { id: true, email: true, technicianProfile: true } },
      service: true
    }
  });

  return booking;
};

const getUserBookings = async (userId: string) => {
  return prisma.booking.findMany({
    where: { customerId: userId },
    include: {
      technician: { select: { id: true, email: true, technicianProfile: true } },
      service: true,
      payment: true,
      review: true
    },
    orderBy: { createdAt: 'desc' }
  });
};

const getBookingDetails = async (bookingId: string, customerId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      technician: { select: { id: true, email: true, technicianProfile: true } },
      customer: { select: { id: true, email: true } },
      service: true,
      payment: true,
      review: true
    }
  });

  if (!booking) throw new Error('Booking not found');
  
  // Ensure the booking belongs to the customer
  if (booking.customerId !== customerId) {
    throw new Error('You do not have permission to view this booking');
  }

  return booking;
};

export const BookingServices = {
  createBooking,
  getUserBookings,
  getBookingDetails
};
