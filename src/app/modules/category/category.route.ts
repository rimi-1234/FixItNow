import express from 'express';
import { CategoryControllers } from './category.controller.js';
import { auth } from '../../../middlewares/auth.js';
import { Role } from '@prisma/client';

const router = express.Router();

router.get('/', CategoryControllers.getAllCategories);
router.post('/', auth(Role.ADMIN), CategoryControllers.createCategory);

export const CategoryRoutes = router;
