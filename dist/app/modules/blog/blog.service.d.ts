export declare const BlogServices: {
    getPosts(query: {
        page?: string;
        limit?: string;
        published?: string;
    }): Promise<{
        posts: ({
            author: {
                name: string | null;
                email: string;
                id: string;
            };
        } & {
            id: string;
            imageUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string;
            excerpt: string;
            content: string;
            published: boolean;
            publishedAt: Date | null;
            authorId: string;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getPostBySlug(slug: string): Promise<{
        author: {
            name: string | null;
            email: string;
            id: string;
        };
    } & {
        id: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        published: boolean;
        publishedAt: Date | null;
        authorId: string;
    }>;
    createPost(authorId: string, payload: {
        title: string;
        excerpt: string;
        content: string;
        imageUrl?: string;
        published?: boolean;
    }): Promise<{
        author: {
            name: string | null;
            email: string;
            id: string;
        };
    } & {
        id: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        published: boolean;
        publishedAt: Date | null;
        authorId: string;
    }>;
    updatePost(id: string, authorId: string, isAdmin: boolean, payload: Partial<{
        title: string;
        excerpt: string;
        content: string;
        imageUrl: string;
        published: boolean;
    }>): Promise<{
        author: {
            name: string | null;
            email: string;
            id: string;
        };
    } & {
        id: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        published: boolean;
        publishedAt: Date | null;
        authorId: string;
    }>;
    deletePost(id: string, authorId: string, isAdmin: boolean): Promise<{
        id: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        published: boolean;
        publishedAt: Date | null;
        authorId: string;
    }>;
};
//# sourceMappingURL=blog.service.d.ts.map