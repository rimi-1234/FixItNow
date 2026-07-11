import { ICategoryPayload } from './category.interface.js';
export declare const CategoryServices: {
    getAllCategories: () => Promise<({
        _count: {
            services: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
    })[]>;
    createCategory: (payload: ICategoryPayload) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
    }>;
    updateCategory: (id: string, payload: Partial<ICategoryPayload>) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
    }>;
    deleteCategory: (id: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
    }>;
};
//# sourceMappingURL=category.service.d.ts.map