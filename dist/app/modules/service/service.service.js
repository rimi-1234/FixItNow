import { Prisma } from '@prisma/client';
import prisma from '../../../lib/prisma.js';
const getAllServices = async (filters) => {
    const { type, categoryId, location, minRating, minPrice, maxPrice, search } = filters;
    const where = {
        ...(search
            ? {
                OR: [
                    { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
                    { description: { contains: search, mode: Prisma.QueryMode.insensitive } },
                ],
            }
            : {}),
        ...(categoryId ? { categoryId } : {}),
        ...(type && !categoryId
            ? { category: { name: { contains: type, mode: Prisma.QueryMode.insensitive } } }
            : {}),
        ...(location
            ? {
                technician: {
                    technicianProfile: {
                        is: {
                            location: { contains: location, mode: Prisma.QueryMode.insensitive },
                        },
                    },
                },
            }
            : {}),
    };
    if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {
            ...(minPrice !== undefined ? { gte: Number(minPrice) } : {}),
            ...(maxPrice !== undefined ? { lte: Number(maxPrice) } : {}),
        };
    }
    const services = await prisma.service.findMany({
        where,
        include: {
            category: true,
            technician: {
                select: {
                    id: true,
                    email: true,
                    technicianProfile: true,
                    reviewsReceived: { select: { rating: true } },
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
    const withRatings = services.map((service) => {
        const { reviewsReceived, ...technicianRest } = service.technician;
        const reviewCount = reviewsReceived.length;
        const averageRating = reviewCount
            ? Number((reviewsReceived.reduce((sum, r) => sum + r.rating, 0) /
                reviewCount).toFixed(2))
            : 0;
        return {
            ...service,
            technician: { ...technicianRest, averageRating, reviewCount },
        };
    });
    if (minRating !== undefined) {
        return withRatings.filter((s) => s.technician.averageRating >= Number(minRating));
    }
    return withRatings;
};
const createService = async (technicianId, payload) => {
    const category = await prisma.category.findUnique({ where: { id: payload.categoryId } });
    if (!category)
        throw Object.assign(new Error('Category not found'), { statusCode: 404 });
    return prisma.service.create({
        data: { ...payload, technicianId },
        include: { category: true },
    });
};
const updateService = async (technicianId, serviceId, payload) => {
    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service)
        throw Object.assign(new Error('Service not found'), { statusCode: 404 });
    if (service.technicianId !== technicianId) {
        throw Object.assign(new Error('Access denied: Not your service'), { statusCode: 403 });
    }
    if (payload.categoryId) {
        const category = await prisma.category.findUnique({ where: { id: payload.categoryId } });
        if (!category)
            throw Object.assign(new Error('Category not found'), { statusCode: 404 });
    }
    return prisma.service.update({
        where: { id: serviceId },
        data: payload,
        include: { category: true },
    });
};
const deleteService = async (technicianId, serviceId) => {
    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service)
        throw Object.assign(new Error('Service not found'), { statusCode: 404 });
    if (service.technicianId !== technicianId) {
        throw Object.assign(new Error('Access denied: Not your service'), { statusCode: 403 });
    }
    return prisma.service.delete({ where: { id: serviceId } });
};
const getServiceById = async (id) => {
    const service = await prisma.service.findUnique({
        where: { id },
        include: {
            category: true,
            technician: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                    technicianProfile: true,
                    reviewsReceived: { select: { rating: true, comment: true, createdAt: true, customer: { select: { id: true, email: true, name: true } } } },
                },
            },
        },
    });
    if (!service)
        throw Object.assign(new Error('Service not found'), { statusCode: 404 });
    const reviews = service.technician.reviewsReceived;
    const reviewCount = reviews.length;
    const averageRating = reviewCount
        ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(2))
        : 0;
    const { reviewsReceived, ...techRest } = service.technician;
    // Related services by same technician or same category
    const related = await prisma.service.findMany({
        where: {
            id: { not: id },
            OR: [{ technicianId: service.technicianId }, { categoryId: service.categoryId }],
        },
        take: 4,
        include: {
            category: true,
            technician: { select: { id: true, email: true, name: true, technicianProfile: true, reviewsReceived: { select: { rating: true } } } },
        },
    });
    const relatedWithRatings = related.map((s) => {
        const rc = s.technician.reviewsReceived.length;
        const ar = rc ? Number((s.technician.reviewsReceived.reduce((sum, r) => sum + r.rating, 0) / rc).toFixed(2)) : 0;
        const { reviewsReceived: _rr, ...rest } = s.technician;
        return { ...s, technician: { ...rest, averageRating: ar, reviewCount: rc } };
    });
    return {
        ...service,
        technician: { ...techRest, averageRating, reviewCount, reviews },
        related: relatedWithRatings,
    };
};
export const ServiceServices = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
};
//# sourceMappingURL=service.service.js.map