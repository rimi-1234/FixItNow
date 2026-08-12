import prisma from '../../../lib/prisma.js';

export const ContactServices = {
  async createMessage(payload: { name: string; email: string; subject: string; message: string }) {
    return prisma.contactMessage.create({ data: payload });
  },

  async getMessages(query: { page?: string; limit?: string; read?: string }) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(50, Math.max(1, Number(query.limit) || 20));
    const skip = (page - 1) * limit;

    const where = query.read !== undefined ? { read: query.read === 'true' } : {};

    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.contactMessage.count({ where }),
    ]);

    return { messages, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async markRead(id: string) {
    return prisma.contactMessage.update({ where: { id }, data: { read: true } });
  },
};
