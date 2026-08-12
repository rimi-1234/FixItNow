import express from 'express';
import { ReviewControllers } from './review.controller.js';
import { auth } from '../../../middlewares/auth.js';
import { Role } from '@prisma/client';
import { validateRequest } from '../../../middlewares/validateRequest.js';
import { ReviewValidation } from './review.validation.js';
const router = express.Router();
router.post('/', auth(Role.CUSTOMER), validateRequest(ReviewValidation.createReviewValidationSchema), ReviewControllers.createReview);
router.get('/', validateRequest(ReviewValidation.getLatestReviewsValidationSchema), ReviewControllers.getLatestReviews);
export const ReviewRoutes = router;
//# sourceMappingURL=review.route.js.map