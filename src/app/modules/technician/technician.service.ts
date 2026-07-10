import prisma from '../../../lib/prisma.js';
import { ITechnicianUpdateProfilePayload } from './technician.interface.js';
import { BookingStatus } from '@prisma/client';

const getAllTechnicians = async (filters: any) => {
  const { skill, minExperience, search } = filters;

  return prisma.user.findMany({
    where: {
      role: 'TECHNICIAN',
      status: 'ACTIVE',
      ...(search && {
        email: { contains: search, mode: 'insensitive' }
      }),
      technicianProfile: {
        ...(skill && { skills: { has: skill } }),
        ...(minExperience && { experience: { gte: Number(minExperience) } })
      }
    },
    select: {
      id: true,
      email: true,
      status: true,
      createdAt: true,
      technicianProfile: true,
      services: {
        include: { category: true }
      }
    }
  });
};

const getTechnicianById = async (id: string) => {
  const technician = await prisma.user.findUnique({
    where: { id, role: 'TECHNICIAN' },
    select: {
      id: true,
      email: true,
      status: true,
      createdAt: true,
      technicianProfile: true,
      services: {
        include: { category: true }
      },
      reviewsReceived: {
        include: {
          customer: { select: { id: true, email: true } },
          booking: { select: { id: true, service: true } }
        }
      }
    }
  });

  if (!technician) throw Object.assign(new Error('Technician not found'), { statusCode: 404 });
  return technician;
};

const updateProfile = async (id: string, payload: ITechnicianUpdateProfilePayload) => {
  const profile = await prisma.technicianProfile.findUnique({
    where: { userId: id }
  });

  if (!profile) {
    return prisma.technicianProfile.create({
      data: { userId: id, ...payload }
    });
  }

  return prisma.technicianProfile.update({
    where: { userId: id },
    data: payload
  });
};

const updateAvailability = async (technicianId: string, availability: string[]) => {
  // Stored as JSON in bio field or we track it separately
  // For now we upsert a profile with availability note
  return prisma.technicianProfile.upsert({
    where: { userId: technicianId },
    create: { userId: technicianId, skills: [], availability },
    update: { availability },
  });
};

const getTechnicianBookings = async (technicianId: string) => {
  return prisma.booking.findMany({
    where: { technicianId },
    include: {
      customer: { select: { id: true, email: true } },
      service: { include: { category: true } },
      payment: true,
      review: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

const updateBookingStatus = async (
  technicianId: string,
  bookingId: string,
  status: BookingStatus
) => {
  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking) throw Object.assign(new Error('Booking not found'), { statusCode: 404 });
  if (booking.technicianId !== technicianId)
    throw Object.assign(new Error('Access denied: Not your booking'), { statusCode: 403 });

  // Validate allowed transitions
  const allowed: Partial<Record<BookingStatus, BookingStatus[]>> = {
    REQUESTED: ['ACCEPTED', 'DECLINED'],
    PAID: ['IN_PROGRESS'],
    IN_PROGRESS: ['COMPLETED'],
  };

  if (!allowed[booking.status]?.includes(status)) {
    throw Object.assign(
      new Error(`Cannot transition booking from ${booking.status} to ${status}`),
      { statusCode: 400 }
    );
  }

  return prisma.booking.update({
    where: { id: bookingId },
    data: { status },
    include: {
      customer: { select: { id: true, email: true } },
      service: true,
    },
  });
};

export const TechnicianServices = {
  getAllTechnicians,
  getTechnicianById,
  updateProfile,
  updateAvailability,
  getTechnicianBookings,
  updateBookingStatus,
};
