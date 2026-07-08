import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync.js';
import { sendResponse } from '../../../utils/sendResponse.js';
import { TechnicianServices } from './technician.service.js';

const getAllTechnicians = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianServices.getAllTechnicians(req.query);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Technicians retrieved successfully",
    data: result
  });
});

const getTechnicianById = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianServices.getTechnicianById(req.params.id as string);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Technician profile retrieved successfully",
    data: result
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await TechnicianServices.updateProfile(user.id, req.body);
  
  sendResponse(res, { statusCode: 200, success: true, message: "Profile updated successfully", data: result });
});

const updateAvailability = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, { statusCode: 200, success: true, message: "Availability updated successfully", data: {} });
});

const getTechnicianBookings = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, { statusCode: 200, success: true, message: "Bookings retrieved successfully", data: [] });
});

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, { statusCode: 200, success: true, message: "Booking status updated successfully", data: {} });
});

export const TechnicianControllers = {
  getAllTechnicians,
  getTechnicianById,
  updateProfile,
  updateAvailability,
  getTechnicianBookings,
  updateBookingStatus
};
