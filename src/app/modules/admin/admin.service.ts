import prisma from '../../../lib/prisma.js';

const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      technicianProfile: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

const updateUserStatus = async (userId: string, status: 'ACTIVE' | 'BANNED') => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw Object.assign(new Error('User not found'), { statusCode: 404 });

  return prisma.user.update({
    where: { id: userId },
    data: { status },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      updatedAt: true,
    },
  });
};

const getAllBookings = async () => {
  return prisma.booking.findMany({
    include: {
      customer: { select: { id: true, email: true } },
      technician: { select: { id: true, email: true, technicianProfile: true } },
      service: { include: { category: true } },
      payment: true,
      review: true,
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const AdminServices = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
};
