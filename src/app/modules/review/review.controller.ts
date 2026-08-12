import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync.js';
import { sendResponse } from '../../../utils/sendResponse.js';
import { ReviewServices } from './review.service.js';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.createReview(req.user.id, req.body);
  sendResponse(res, { statusCode: 201, success: true, message: "Review created successfully", data: result });
});

const getLatestReviews = catchAsync(async (req: Request, res: Response) => {
  const limit = typeof req.query.limit === 'number' ? req.query.limit : 6;
  const result = await ReviewServices.getLatestReviews(limit);
  sendResponse(res, { statusCode: 200, success: true, message: 'Latest reviews retrieved', data: result });
});

export const ReviewControllers = {
  createReview,
  getLatestReviews,
};
