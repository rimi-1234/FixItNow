import { IServiceFilters, IServicePayload, IServiceUpdatePayload } from './service.interface.js';
export declare const ServiceServices: {
    getAllServices: (filters: IServiceFilters) => Promise<{
        technician: {
            averageRating: number;
            reviewCount: number;
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
        category: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            slug: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
        categoryId: string;
        technicianId: string;
    }[]>;
    createService: (technicianId: string, payload: IServicePayload) => Promise<{
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
    }>;
    updateService: (technicianId: string, serviceId: string, payload: IServiceUpdatePayload) => Promise<{
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
    }>;
    deleteService: (technicianId: string, serviceId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
        categoryId: string;
        technicianId: string;
    }>;
};
//# sourceMappingURL=service.service.d.ts.map