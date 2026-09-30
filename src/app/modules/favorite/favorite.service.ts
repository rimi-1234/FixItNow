import prisma from '../../../lib/prisma.js';

const addFavorite = async (customerId: string, technicianId: string) => {
  const technician = await prisma.user.findUnique({ where: { id: technicianId, role: 'TECHNICIAN' } });
  if (!technician) throw Object.assign(new Error('Technician not found'), { statusCode: 404 });
  if (customerId === technicianId) throw Object.assign(new Error('Cannot favorite yourself'), { statusCode: 400 });

  return prisma.favoriteTechnician.upsert({
    where: { customerId_technicianId: { customerId, technicianId } },
    create: { customerId, technicianId },
    update: {},
  });
};

const removeFavorite = async (customerId: string, technicianId: string) => {
  const existing = await prisma.favoriteTechnician.findUnique({
    where: { customerId_technicianId: { customerId, technicianId } },
  });
  if (!existing) throw Object.assign(new Error('Not in favorites'), { statusCode: 404 });

  return prisma.favoriteTechnician.delete({
    where: { customerId_technicianId: { customerId, technicianId } },
  });
};

const getFavorites = async (customerId: string) => {
  return prisma.favoriteTechnician.findMany({
    where: { customerId },
    include: {
      technician: {
        select: {
          id: true,
          email: true,
          name: true,
          imageUrl: true,
          technicianProfile: true,
          services: { select: { id: true, name: true, price: true, categoryId: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};

const isFavorite = async (customerId: string, technicianId: string) => {
  const row = await prisma.favoriteTechnician.findUnique({
    where: { customerId_technicianId: { customerId, technicianId } },
  });
  return { isFavorite: Boolean(row) };
};

export const FavoriteServices = {
  addFavorite,
  removeFavorite,
  getFavorites,
  isFavorite,
};
