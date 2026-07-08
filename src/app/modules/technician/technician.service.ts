import prisma from '../../../lib/prisma.js';
import { ITechnicianUpdateProfilePayload } from './technician.interface.js';

const getAllTechnicians = async (filters: any) => {
  const { skill, minExperience, search } = filters;

  return prisma.user.findMany({
    where: {
      role: 'TECHNICIAN',
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

  if (!technician) throw new Error("Technician not found");
  return technician;
};

const updateProfile = async (id: string, payload: ITechnicianUpdateProfilePayload) => {
  const profile = await prisma.technicianProfile.findUnique({
    where: { userId: id }
  });

  if (!profile) {
    // create if not exists
    return prisma.technicianProfile.create({
      data: {
        userId: id,
        ...payload
      }
    });
  }

  return prisma.technicianProfile.update({
    where: { userId: id },
    data: payload
  });
};

export const TechnicianServices = {
  getAllTechnicians,
  getTechnicianById,
  updateProfile
};
