import prisma from '../../../lib/prisma.js';

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const BlogServices = {
  async getPosts(query: { page?: string; limit?: string; published?: string }) {
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

  async getPostBySlug(slug: string) {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: { author: { select: { id: true, email: true, name: true } } },
    });
    if (!post) throw Object.assign(new Error('Post not found'), { statusCode: 404 });
    return post;
  },

  async createPost(authorId: string, payload: { title: string; excerpt: string; content: string; imageUrl?: string; published?: boolean }) {
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

  async updatePost(id: string, authorId: string, isAdmin: boolean, payload: Partial<{ title: string; excerpt: string; content: string; imageUrl: string; published: boolean }>) {
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) throw Object.assign(new Error('Post not found'), { statusCode: 404 });
    if (!isAdmin && post.authorId !== authorId) throw Object.assign(new Error('Forbidden'), { statusCode: 403 });

    return prisma.blogPost.update({
      where: { id },
      data: {
        ...payload,
        ...(payload.published !== undefined ? { publishedAt: payload.published ? new Date() : null } : {}),
      },
      include: { author: { select: { id: true, email: true, name: true } } },
    });
  },

  async deletePost(id: string, authorId: string, isAdmin: boolean) {
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) throw Object.assign(new Error('Post not found'), { statusCode: 404 });
    if (!isAdmin && post.authorId !== authorId) throw Object.assign(new Error('Forbidden'), { statusCode: 403 });
    return prisma.blogPost.delete({ where: { id } });
  },
};
