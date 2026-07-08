import express from 'express';
import { AdminControllers } from './admin.controller.js';
import { auth } from '../../../middlewares/auth.js';
import { Role } from '@prisma/client';
import { CategoryControllers } from '../category/category.controller.js';

const router = express.Router();

router.get('/users', auth(Role.ADMIN), AdminControllers.getAllUsers);
router.patch('/users/:id', auth(Role.ADMIN), AdminControllers.updateUserStatus);
router.get('/bookings', auth(Role.ADMIN), AdminControllers.getAllBookings);
router.get('/categories', auth(Role.ADMIN), CategoryControllers.getAllCategories);
router.post('/categories', auth(Role.ADMIN), CategoryControllers.createCategory);

export const AdminRoutes = router;
