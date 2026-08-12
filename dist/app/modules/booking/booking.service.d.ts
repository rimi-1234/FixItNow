import { IBookingCreatePayload } from './booking.interface.js';
export declare const BookingServices: {
    createBooking: (customerId: string, payload: IBookingCreatePayload) => Promise<{
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
        technician: {
            email: string;
            id: string;
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
    getUserBookings: (userId: string) => Promise<({
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
        technician: {
            email: string;
            id: string;
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
    getBookingDetails: (bookingId: string, customerId: string) => Promise<{
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
        technician: {
            email: string;
            id: string;
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
    }>;
    cancelBooking: (bookingId: string, customerId: string) => Promise<{
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
        technician: {
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
    }>;
};
//# sourceMappingURL=booking.service.d.ts.map