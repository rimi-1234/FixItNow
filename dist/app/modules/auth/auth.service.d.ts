import { Role } from '@prisma/client';
import { IGoogleLoginPayload, ILoginPayload, IRegisterPayload, IUpdateProfilePayload } from './auth.interface.js';
export declare const AuthServices: {
    registerUser: (payload: IRegisterPayload) => Promise<{
        accessToken: string;
        user: {
            role: import("@prisma/client").$Enums.Role;
            email: string;
            id: string;
            status: import("@prisma/client").$Enums.UserStatus;
            createdAt: Date;
            updatedAt: Date;
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
    }>;
    loginUser: (payload: ILoginPayload) => Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            status: "ACTIVE";
        };
    }>;
    demoLoginUser: (role: Role) => Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            status: "ACTIVE";
        };
    }>;
    loginWithGoogle: (payload: IGoogleLoginPayload) => Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            role: import("@prisma/client").$Enums.Role;
            status: import("@prisma/client").$Enums.UserStatus;
        };
    }>;
    getMeFromDB: (email: string) => Promise<{
        role: import("@prisma/client").$Enums.Role;
        name: string | null;
        email: string;
        id: string;
        phone: string | null;
        imageUrl: string | null;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
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
    }>;
    updateProfile: (userId: string, payload: IUpdateProfilePayload) => Promise<{
        role: import("@prisma/client").$Enums.Role;
        name: string | null;
        email: string;
        id: string;
        phone: string | null;
        imageUrl: string | null;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map