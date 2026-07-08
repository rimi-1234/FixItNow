import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync.js';
import { sendResponse } from '../../../utils/sendResponse.js';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, { statusCode: 201, success: true, message: "Booking created", data: {} });
});

const getUserBookings = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, { statusCode: 200, success: true, message: "Bookings retrieved", data: [] });
});

const getBookingDetails = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, { statusCode: 200, success: true, message: "Booking details retrieved", data: {} });
});

export const BookingControllers = {
  createBooking,
  getUserBookings,
  getBookingDetails
};
