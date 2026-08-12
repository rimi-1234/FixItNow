import { ITechnicianFilters, ITechnicianUpdateProfilePayload } from './technician.interface.js';
import { BookingStatus } from '@prisma/client';
export declare const TechnicianServices: {
    getAllTechnicians: (filters: ITechnicianFilters) => Promise<(Omit<{
        email: string;
        id: string;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        technicianProfile: {
            id: string;
            imageUrl: string | null;
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
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                slug: string;
            };
        } & {
            name: string;
            id: string;
            imageUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
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
            booking: {
                id: string;
                service: {
                    name: string;
                    id: string;
                    imageUrl: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string;
                    price: number;
                    categoryId: string;
                    technicianId: string;
                };
            };
            customer: {
                email: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            bookingId: string;
            customerId: string;
            rating: number;
            comment: string | null;
        })[];
        bookedSlots: {
            id: string;
            scheduledTime: Date;
            status: import("@prisma/client").$Enums.BookingStatus;
        }[];
        averageRating: number;
        reviewCount: number;
        email: string;
        id: string;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        technicianProfile: {
            id: string;
            imageUrl: string | null;
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
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                slug: string;
            };
        } & {
            name: string;
            id: string;
            imageUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            price: number;
            categoryId: string;
            technicianId: string;
        })[];
    }>;
    updateProfile: (id: string, payload: ITechnicianUpdateProfilePayload) => Promise<{
        id: string;
        imageUrl: string | null;
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
        imageUrl: string | null;
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
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                slug: string;
            };
        } & {
            name: string;
            id: string;
            imageUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            price: number;
            categoryId: string;
            technicianId: string;
        };
        review: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            bookingId: string;
            customerId: string;
            rating: number;
            comment: string | null;
        } | null;
        customer: {
            email: string;
            id: string;
        };
        payment: {
            method: string;
            id: string;
            status: import("@prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            bookingId: string;
            transactionId: string | null;
            amount: number;
            provider: import("@prisma/client").$Enums.PaymentProvider;
            paidAt: Date | null;
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
            name: string;
            id: string;
            imageUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            price: number;
            categoryId: string;
            technicianId: string;
        };
        customer: {
            email: string;
            id: string;
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