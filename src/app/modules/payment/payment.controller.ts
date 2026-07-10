import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync.js';
import { sendResponse } from '../../../utils/sendResponse.js';
import { PaymentServices } from './payment.service.js';

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user.id;
  const { bookingId } = req.body;
  if (!bookingId) throw Object.assign(new Error('bookingId is required'), { statusCode: 400 });

  const result = await PaymentServices.createPaymentIntent(customerId, bookingId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Payment intent created successfully. Use clientSecret to confirm payment.',
    data: result,
  });
});

// Stripe webhook — receives raw body
const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  if (!sig) throw Object.assign(new Error('Missing stripe-signature header'), { statusCode: 400 });

  const result = await PaymentServices.confirmPayment(req.body as Buffer, sig);
  res.status(200).json(result);
});

const getUserPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentServices.getUserPayments(req.user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment history retrieved successfully',
    data: result,
  });
});

const getPaymentDetails = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentServices.getPaymentDetails(req.params.id, req.user.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment details retrieved successfully',
    data: result,
  });
});

export const PaymentControllers = {
  createPayment,
  confirmPayment,
  getUserPayments,
  getPaymentDetails,
};
