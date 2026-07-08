import prisma from '../../../lib/prisma.js';

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

export const TechnicianServices = {
  getAllTechnicians,
  getTechnicianById
};
