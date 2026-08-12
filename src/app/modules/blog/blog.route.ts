import express from 'express';
import { BlogControllers } from './blog.controller.js';
import { auth } from '../../../middlewares/auth.js';
import { Role } from '@prisma/client';

const router = express.Router();

router.get('/', BlogControllers.getPosts);
router.get('/:slug', BlogControllers.getPostBySlug);
router.post('/', auth(Role.ADMIN), BlogControllers.createPost);
router.patch('/:id', auth(Role.ADMIN), BlogControllers.updatePost);
router.delete('/:id', auth(Role.ADMIN), BlogControllers.deletePost);

export const BlogRoutes = router;
