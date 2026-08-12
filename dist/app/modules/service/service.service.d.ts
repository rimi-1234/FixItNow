import { IServiceFilters, IServicePayload, IServiceUpdatePayload } from './service.interface.js';
export declare const ServiceServices: {
    getAllServices: (filters: IServiceFilters) => Promise<{
        technician: {
            averageRating: number;
            reviewCount: number;
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
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        };
        name: string;
        id: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        price: number;
        categoryId: string;
        technicianId: string;
    }[]>;
    getServiceById: (id: string) => Promise<{
        technician: {
            averageRating: number;
            reviewCount: number;
            reviews: {
                createdAt: Date;
                rating: number;
                comment: string | null;
                customer: {
                    name: string | null;
                    email: string;
                    id: string;
                };
            }[];
            name: string | null;
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
        related: {
            technician: {
                averageRating: number;
                reviewCount: number;
                name: string | null;
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
            category: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                slug: string;
            };
            name: string;
            id: string;
            imageUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            price: number;
            categoryId: string;
            technicianId: string;
        }[];
        category: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
        };
        name: string;
        id: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        price: number;
        categoryId: string;
        technicianId: string;
    }>;
    createService: (technicianId: string, payload: IServicePayload) => Promise<{
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
    }>;
    updateService: (technicianId: string, serviceId: string, payload: IServiceUpdatePayload) => Promise<{
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
    }>;
    deleteService: (technicianId: string, serviceId: string) => Promise<{
        name: string;
        id: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        price: number;
        categoryId: string;
        technicianId: string;
    }>;
};
//# sourceMappingURL=service.service.d.ts.map