import prisma from '../../../lib/prisma.js';
function slugify(title) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
export const BlogServices = {
    async getPosts(query) {
        const page = Math.max(1, Number(query.page) || 1);
        const limit = Math.min(50, Math.max(1, Number(query.limit) || 9));
        const skip = (page - 1) * limit;
        const showAll = query.published === 'all';
        const where = showAll ? {} : { published: true };
        const [posts, total] = await Promise.all([
            prisma.blogPost.findMany({
                where,
                orderBy: { publishedAt: 'desc' },
                skip,
                take: limit,
                include: { author: { select: { id: true, email: true, name: true } } },
            }),
            prisma.blogPost.count({ where }),
        ]);
        return { posts, total, page, limit, totalPages: Math.ceil(total / limit) };
    },
    async getPostBySlug(slug) {
        const post = await prisma.blogPost.findUnique({
            where: { slug },
            include: { author: { select: { id: true, email: true, name: true } } },
        });
        if (!post)
            throw Object.assign(new Error('Post not found'), { statusCode: 404 });
        return post;
    },
    async createPost(authorId, payload) {
        const slug = slugify(payload.title) + '-' + Date.now();
        return prisma.blogPost.create({
            data: {
                ...payload,
                slug,
                authorId,
                publishedAt: payload.published ? new Date() : null,
            },
            include: { author: { select: { id: true, email: true, name: true } } },
        });
    },
    async updatePost(id, authorId, isAdmin, payload) {
        const post = await prisma.blogPost.findUnique({ where: { id } });
        if (!post)
            throw Object.assign(new Error('Post not found'), { statusCode: 404 });
        if (!isAdmin && post.authorId !== authorId)
            throw Object.assign(new Error('Forbidden'), { statusCode: 403 });
        return prisma.blogPost.update({
            where: { id },
            data: {
                ...payload,
                ...(payload.published !== undefined ? { publishedAt: payload.published ? new Date() : null } : {}),
            },
            include: { author: { select: { id: true, email: true, name: true } } },
        });
    },
    async deletePost(id, authorId, isAdmin) {
        const post = await prisma.blogPost.findUnique({ where: { id } });
        if (!post)
            throw Object.assign(new Error('Post not found'), { statusCode: 404 });
        if (!isAdmin && post.authorId !== authorId)
            throw Object.assign(new Error('Forbidden'), { statusCode: 403 });
        return prisma.blogPost.delete({ where: { id } });
    },
};
//# sourceMappingURL=blog.service.js.map