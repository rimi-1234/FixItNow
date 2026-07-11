import { ITechnicianFilters, ITechnicianUpdateProfilePayload } from './technician.interface.js';
import { BookingStatus } from '@prisma/client';
export declare const TechnicianServices: {
    getAllTechnicians: (filters: ITechnicianFilters) => Promise<(Omit<{
        id: string;
        email: string;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        technicianProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            skills: string[];
            availability: string[];
            experience: number;
            hourlyRate: number;
            bio: string | null;
            location: string | null;
            userId: string;
        } | null;
        services: ({
            category: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                slug: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            price: number;
            categoryId: string;
            technicianId: string;
        })[];
        reviewsReceived: {
            rating: number;
        }[];
    }, "reviewsReceived"> & {
        averageRating: number;
        reviewCount: number;
    })[]>;
    getTechnicianById: (id: string) => Promise<{
        reviews: ({
            customer: {
                id: string;
                email: string;
            };
            booking: {
                id: string;
                service: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    description: string;
                    price: number;
                    categoryId: string;
                    technicianId: string;
                };
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            customerId: string;
            bookingId: string;
            rating: number;
            comment: string | null;
        })[];
        averageRating: number;
        reviewCount: number;
        id: string;
        email: string;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        technicianProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            skills: string[];
            availability: string[];
            experience: number;
            hourlyRate: number;
            bio: string | null;
            location: string | null;
            userId: string;
        } | null;
        services: ({
            category: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                slug: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            price: number;
            categoryId: string;
            technicianId: string;
        })[];
    }>;
    updateProfile: (id: string, payload: ITechnicianUpdateProfilePayload) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        skills: string[];
        availability: string[];
        experience: number;
        hourlyRate: number;
        bio: string | null;
        location: string | null;
        userId: string;
    }>;
    updateAvailability: (technicianId: string, availability: string[]) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        skills: string[];
        availability: string[];
        experience: number;
        hourlyRate: number;
        bio: string | null;
        location: string | null;
        userId: string;
    }>;
    getTechnicianBookings: (technicianId: string) => Promise<({
        service: {
            category: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                slug: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            price: number;
            categoryId: string;
            technicianId: string;
        };
        customer: {
            id: string;
            email: string;
        };
        payment: {
            id: string;
            status: import("@prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            bookingId: string;
            transactionId: string | null;
            amount: number;
            method: string;
            provider: import("@prisma/client").$Enums.PaymentProvider;
            paidAt: Date | null;
        } | null;
        review: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            customerId: string;
            bookingId: string;
            rating: number;
            comment: string | null;
        } | null;
    } & {
        id: string;
        status: import("@prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        customerId: string;
        serviceId: string;
        scheduledTime: Date;
    })[]>;
    updateBookingStatus: (technicianId: string, bookingId: string, status: BookingStatus) => Promise<{
        service: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            price: number;
            categoryId: string;
            technicianId: string;
        };
        customer: {
            id: string;
            email: string;
        };
    } & {
        id: string;
        status: import("@prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        technicianId: string;
        customerId: string;
        serviceId: string;
        scheduledTime: Date;
    }>;
};
//# sourceMappingURL=technician.service.d.ts.map