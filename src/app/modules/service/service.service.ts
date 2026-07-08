import prisma from '../../../lib/prisma.js';

const getAllServices = async (filters: any) => {
  const { type, minPrice, maxPrice, search } = filters;

  return prisma.service.findMany({
    where: {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      }),
      category: type ? { name: { contains: type, mode: 'insensitive' } } : undefined,
      price: {
        gte: minPrice ? Number(minPrice) : undefined,
        lte: maxPrice ? Number(maxPrice) : undefined,
      }
    },
    include: {
      category: true,
      technician: {
        select: {
          id: true,
          email: true,
          technicianProfile: true,
        }
      }
    }
  });
};

export const ServiceServices = {
  getAllServices
};
