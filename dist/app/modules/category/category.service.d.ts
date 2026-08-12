import { ICategoryPayload } from './category.interface.js';
export declare const CategoryServices: {
    getAllCategories: () => Promise<({
        _count: {
            services: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    })[]>;
    createCategory: (payload: ICategoryPayload) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
    updateCategory: (id: string, payload: Partial<ICategoryPayload>) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
    deleteCategory: (id: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
};
//# sourceMappingURL=category.service.d.ts.map