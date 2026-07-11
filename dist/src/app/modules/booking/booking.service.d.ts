import { IBookingCreatePayload } from './booking.interface.js';
export declare const BookingServices: {
    createBooking: (customerId: string, payload: IBookingCreatePayload) => Promise<{
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
        technician: {
            id: string;
            email: string;
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
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            price: number;
            categoryId: string;
            technicianId: string;
        };
        technician: {
            id: string;
            email: string;
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
    getBookingDetails: (bookingId: string, customerId: string) => Promise<{
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
        technician: {
            id: string;
            email: string;
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
    }>;
    cancelBooking: (bookingId: string, customerId: string) => Promise<{
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
        technician: {
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