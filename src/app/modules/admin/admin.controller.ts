import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync.js';
import { sendResponse } from '../../../utils/sendResponse.js';
import { AdminServices } from './admin.service.js';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.getAllUsers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body as { status?: string };
  if (!status || !['ACTIVE', 'BANNED'].includes(status)) {
    throw Object.assign(new Error('status must be ACTIVE or BANNED'), { statusCode: 400 });
  }
  const result = await AdminServices.updateUserStatus(req.params.id as string, status as 'ACTIVE' | 'BANNED');
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `User status updated to ${status}`,
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminServices.getAllBookings();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All bookings retrieved successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
};
