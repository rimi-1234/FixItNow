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

const createCategory = async (payload: any) => {
  return prisma.category.create({
    data: payload
  });
};

export const CategoryServices = {
  getAllCategories,
  createCategory
};
