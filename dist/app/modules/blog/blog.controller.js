import catchAsync from '../../../utils/catchAsync.js';
import { BlogServices } from './blog.service.js';
import { Role } from '@prisma/client';
const getPosts = catchAsync(async (req, res) => {
    const result = await BlogServices.getPosts(req.query);
    res.status(200).json({ success: true, message: 'Posts retrieved', data: result });
});
const getPostBySlug = catchAsync(async (req, res) => {
    const result = await BlogServices.getPostBySlug(req.params.slug);
    res.status(200).json({ success: true, message: 'Post retrieved', data: result });
});
const createPost = catchAsync(async (req, res) => {
    const result = await BlogServices.createPost(req.user.id, req.body);
    res.status(201).json({ success: true, message: 'Post created', data: result });
});
const updatePost = catchAsync(async (req, res) => {
    const isAdmin = req.user.role === Role.ADMIN;
    const result = await BlogServices.updatePost(req.params.id, req.user.id, isAdmin, req.body);
    res.status(200).json({ success: true, message: 'Post updated', data: result });
});
const deletePost = catchAsync(async (req, res) => {
    const isAdmin = req.user.role === Role.ADMIN;
    await BlogServices.deletePost(req.params.id, req.user.id, isAdmin);
    res.status(200).json({ success: true, message: 'Post deleted', data: null });
});
export const BlogControllers = { getPosts, getPostBySlug, createPost, updatePost, deletePost };
//# sourceMappingURL=blog.controller.js.map