import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync.js';
import { sendResponse } from '../../../utils/sendResponse.js';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, { statusCode: 200, success: true, message: "Users retrieved successfully", data: [] });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, { statusCode: 200, success: true, message: "User status updated successfully", data: {} });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, { statusCode: 200, success: true, message: "All bookings retrieved successfully", data: [] });
});

export const AdminControllers = {
  getAllUsers,
  updateUserStatus,
  getAllBookings
};
