import prisma from '../../../lib/prisma.js';
export const ContactServices = {
    async createMessage(payload) {
        return prisma.contactMessage.create({ data: payload });
    },
    async getMessages(query) {
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
    async markRead(id) {
        return prisma.contactMessage.update({ where: { id }, data: { read: true } });
    },
};
//# sourceMappingURL=contact.service.js.map