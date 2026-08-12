import { IAdminBookingFilters, IAdminUserFilters } from './admin.interface.js';
export declare const AdminServices: {
    getAllUsers: (filters: IAdminUserFilters) => Promise<{
        role: import("@prisma/client").$Enums.Role;
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
    }[]>;
    updateUserStatus: (userId: string, status: "ACTIVE" | "BANNED") => Promise<{
        role: import("@prisma/client").$Enums.Role;
        email: string;
        id: string;
        status: import("@prisma/client").$Enums.UserStatus;
        updatedAt: Date;
    }>;
    getAllBookings: (filters: IAdminBookingFilters) => Promise<({
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
    })[]>;
};
//# sourceMappingURL=admin.service.d.ts.map