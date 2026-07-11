import { ILoginPayload, IRegisterPayload } from './auth.interface';
export declare const AuthServices: {
    registerUser: (payload: IRegisterPayload) => Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
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
    getMeFromDB: (email: string) => Promise<{
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        status: import("@prisma/client").$Enums.UserStatus;
        createdAt: Date;
        updatedAt: Date;
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
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map