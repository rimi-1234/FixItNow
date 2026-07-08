import express from 'express';
import { ReviewControllers } from './review.controller.js';
import { auth } from '../../../middlewares/auth.js';
import { Role } from '@prisma/client';

const router = express.Router();

router.post('/', auth(Role.CUSTOMER), ReviewControllers.createReview);

export const ReviewRoutes = router;
