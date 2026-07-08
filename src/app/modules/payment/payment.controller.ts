import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync.js';
import { sendResponse } from '../../../utils/sendResponse.js';

const createPayment = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, { statusCode: 201, success: true, message: "Payment session created", data: {} });
});

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, { statusCode: 200, success: true, message: "Payment confirmed", data: {} });
});

const getUserPayments = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, { statusCode: 200, success: true, message: "Payments retrieved", data: [] });
});

const getPaymentDetails = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, { statusCode: 200, success: true, message: "Payment details retrieved", data: {} });
});

export const PaymentControllers = {
  createPayment,
  confirmPayment,
  getUserPayments,
  getPaymentDetails
};
