import prisma from '../../../lib/prisma.js';

const getAllCategories = async () => {
  return prisma.category.findMany({
    include: {
      _count: {
        select: { services: true }
      }
    }
  });
};

export const CategoryServices = {
  getAllCategories
};
