import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync.js';
import { sendResponse } from '../../../utils/sendResponse.js';
import { CategoryServices } from './category.service.js';

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getAllCategories();
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Categories retrieved successfully",
    data: result
  });
});

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.createCategory(req.body);
  
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Category created successfully",
    data: result
  });
});

export const CategoryControllers = {
  getAllCategories,
  createCategory
};
