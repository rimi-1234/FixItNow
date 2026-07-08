import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync.js';
import { sendResponse } from '../../../utils/sendResponse.js';
import { ServiceServices } from './service.service.js';

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceServices.getAllServices(req.query);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Services retrieved successfully",
    data: result
  });
});

export const ServiceControllers = {
  getAllServices
};
