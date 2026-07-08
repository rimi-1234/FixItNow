import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync.js';
import { sendResponse } from '../../../utils/sendResponse.js';

const createReview = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, { statusCode: 201, success: true, message: "Review created successfully", data: {} });
});

export const ReviewControllers = {
  createReview
};
