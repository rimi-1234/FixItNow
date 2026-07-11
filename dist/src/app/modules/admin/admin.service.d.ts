import { IAdminBookingFilters, IAdminUserFilters } from './admin.interface.js';
export declare const AdminServices: {
    getAllUsers: (filters: IAdminUserFilters) => Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
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
    }[]>;
    updateUserStatus: (userId: string, status: "ACTIVE" | "BANNED") => Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        status: import("@prisma/client").$Enums.UserStatus;
        updatedAt: Date;
    }>;
    getAllBookings: (filters: IAdminBookingFilters) => Promise<({
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
    })[]>;
};
//# sourceMappingURL=admin.service.d.ts.map