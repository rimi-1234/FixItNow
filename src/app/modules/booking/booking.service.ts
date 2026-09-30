import prisma from '../../../lib/prisma.js';
import { Prisma } from '@prisma/client';
import { IBookingCreatePayload } from './booking.interface.js';
import { BookingStatus } from '@prisma/client';
import { createMany } from '../notification/notification.service.js';

function generateReferenceNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `FIN-${year}-${random}`;
}

async function uniqueReferenceNumber(): Promise<string> {
  let ref: string;
  do {
    ref = generateReferenceNumber();
  } while (await prisma.booking.findUnique({ where: { referenceNumber: ref } }).catch(() => null));
  return ref;
}

async function createBookingEvent(
  bookingId: string,
  eventType: string,
  actorId?: string,
  metadata?: Record<string, unknown>
) {
  return prisma.bookingEvent.create({
    data: {
      bookingId,
      eventType,
      actorId: actorId ?? null,
      metadata: metadata ? (metadata as Prisma.InputJsonValue) : Prisma.JsonNull,
    },
  });
}

const createBooking = async (customerId: string, payload: IBookingCreatePayload) => {
  const technician = await prisma.user.findUnique({
    where: { id: payload.technicianId, role: 'TECHNICIAN' },
    select: { id: true, email: true, name: true },
  });
  if (!technician) throw Object.assign(new Error('Technician not found'), { statusCode: 404 });

  const service = await prisma.service.findUnique({ where: { id: payload.serviceId } });
  if (!service) throw Object.assign(new Error('Service not found'), { statusCode: 404 });

  if (service.technicianId !== payload.technicianId) {
    throw Object.assign(new Error('This service is not offered by the selected technician'), { statusCode: 400 });
  }

  const customer = await prisma.user.findUnique({
    where: { id: customerId },
    select: { id: true, name: true, email: true },
  });

  const referenceNumber = await uniqueReferenceNumber();

  const booking = await prisma.booking.create({
    data: {
      referenceNumber,
      customerId,
      technicianId: payload.technicianId,
      serviceId: payload.serviceId,
      scheduledTime: new Date(payload.scheduledTime),
      notes: payload.notes ?? null,
      status: 'REQUESTED',
    },
    include: {
      technician: { select: { id: true, email: true, name: true, technicianProfile: true } },
      service: true,
    },
  });

  await createBookingEvent(booking.id, 'BOOKING_CREATED', customerId);

  const customerName = customer?.name ?? customer?.email ?? 'A customer';
  const serviceName = service.name;

  await createMany([
    {
      userId: payload.technicianId,
      type: 'BOOKING_REQUESTED',
      title: 'New Booking Request',
      body: `${customerName} requested "${serviceName}" — ref ${referenceNumber}`,
      actionUrl: `/dashboard/technician/bookings`,
    },
  ]);

  return booking;
};

const getUserBookings = async (userId: string) => {
  return prisma.booking.findMany({
    where: { customerId: userId },
    include: {
      technician: { select: { id: true, email: true, name: true, technicianProfile: true } },
      service: true,
      payment: true,
      review: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

const getTechnicianBookings = async (technicianId: string) => {
  return prisma.booking.findMany({
    where: { technicianId },
    include: {
      customer: { select: { id: true, email: true, name: true } },
      service: true,
      payment: true,
      review: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

const getBookingDetails = async (bookingId: string, userId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      technician: { select: { id: true, email: true, name: true, technicianProfile: true } },
      customer: { select: { id: true, email: true, name: true } },
      service: true,
      payment: true,
      review: true,
      events: { orderBy: { createdAt: 'asc' } },
    },
  });

  if (!booking) throw Object.assign(new Error('Booking not found'), { statusCode: 404 });

  if (booking.customerId !== userId && booking.technicianId !== userId) {
    throw Object.assign(new Error('You do not have permission to view this booking'), { statusCode: 403 });
  }

  return booking;
};

const CANCELLABLE_STATUSES: BookingStatus[] = ['REQUESTED', 'ACCEPTED', 'PAID'];

const cancelBooking = async (bookingId: string, userId: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { payment: true, service: true },
  });

  if (!booking) throw Object.assign(new Error('Booking not found'), { statusCode: 404 });
  if (booking.customerId !== userId && booking.technicianId !== userId) {
    throw Object.assign(new Error('You do not have permission to cancel this booking'), { statusCode: 403 });
  }
  if (!CANCELLABLE_STATUSES.includes(booking.status)) {
    throw Object.assign(
      new Error(`Booking cannot be cancelled once it is ${booking.status}`),
      { statusCode: 400 }
    );
  }

  const updated = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: 'CANCELLED' },
    include: {
      technician: { select: { id: true, email: true, name: true } },
      customer: { select: { id: true, email: true, name: true } },
      service: true,
      payment: true,
    },
  });

  await createBookingEvent(bookingId, 'BOOKING_CANCELLED', userId);

  const serviceName = booking.service?.name ?? 'service';
  const ref = booking.referenceNumber;
  const otherPartyId = userId === booking.customerId ? booking.technicianId : booking.customerId;

  await createMany([
    {
      userId: otherPartyId,
      type: 'BOOKING_CANCELLED',
      title: 'Booking Cancelled',
      body: `Booking #${ref} for "${serviceName}" has been cancelled.`,
      actionUrl: userId === booking.customerId
        ? `/dashboard/technician/bookings`
        : `/dashboard/customer/bookings/${bookingId}`,
    },
  ]);

  return updated;
};

// Technician: update booking status (accept/decline/start/complete)
const updateBookingStatus = async (
  bookingId: string,
  technicianId: string,
  newStatus: BookingStatus
) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { service: true },
  });

  if (!booking) throw Object.assign(new Error('Booking not found'), { statusCode: 404 });
  if (booking.technicianId !== technicianId) {
    throw Object.assign(new Error('Forbidden'), { statusCode: 403 });
  }

  const allowedTransitions: Partial<Record<BookingStatus, BookingStatus[]>> = {
    REQUESTED: ['ACCEPTED', 'DECLINED'],
    PAID: ['IN_PROGRESS'],
    IN_PROGRESS: ['COMPLETED'],
  };

  const allowed = allowedTransitions[booking.status] ?? [];
  if (!allowed.includes(newStatus)) {
    throw Object.assign(
      new Error(`Cannot transition booking from ${booking.status} to ${newStatus}`),
      { statusCode: 400 }
    );
  }

  const updated = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: newStatus },
    include: {
      customer: { select: { id: true, email: true, name: true } },
      service: true,
      payment: true,
    },
  });

  await createBookingEvent(bookingId, `BOOKING_${newStatus}`, technicianId);

  const serviceName = booking.service?.name ?? 'service';
  const ref = booking.referenceNumber;

  const notifMap: Record<string, { title: string; body: string }> = {
    ACCEPTED: {
      title: 'Booking Accepted',
      body: `Your booking #${ref} for "${serviceName}" has been accepted.`,
    },
    DECLINED: {
      title: 'Booking Declined',
      body: `Your booking #${ref} for "${serviceName}" was declined. You can rebook another technician.`,
    },
    IN_PROGRESS: {
      title: 'Work Started',
      body: `Your technician has started work on booking #${ref}.`,
    },
    COMPLETED: {
      title: 'Booking Completed',
      body: `Booking #${ref} for "${serviceName}" is complete. Please leave a review!`,
    },
  };

  const notif = notifMap[newStatus];
  if (notif) {
    await createMany([
      {
        userId: booking.customerId,
        type: `BOOKING_${newStatus}` as never,
        title: notif.title,
        body: notif.body,
        actionUrl: `/dashboard/customer/bookings/${bookingId}`,
      },
    ]);
  }

  return updated;
};

export const BookingServices = {
  createBooking,
  getUserBookings,
  getTechnicianBookings,
  getBookingDetails,
  cancelBooking,
  updateBookingStatus,
};
