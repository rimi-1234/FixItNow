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
  const result = await TechnicianServices.getTechnicianById(req.params.id);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Technician profile retrieved successfully",
    data: result
  });
});

export const TechnicianControllers = {
  getAllTechnicians,
  getTechnicianById
};
