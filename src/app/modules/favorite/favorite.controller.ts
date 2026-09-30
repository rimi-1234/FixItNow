import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync.js';
import { sendResponse } from '../../../utils/sendResponse.js';
import { FavoriteServices } from './favorite.service.js';

const addFavorite = catchAsync(async (req: Request, res: Response) => {
  const result = await FavoriteServices.addFavorite(req.user.id, req.params.technicianId as string);
  sendResponse(res, { statusCode: 201, success: true, message: 'Added to favorites', data: result });
});

const removeFavorite = catchAsync(async (req: Request, res: Response) => {
  await FavoriteServices.removeFavorite(req.user.id, req.params.technicianId as string);
  sendResponse(res, { statusCode: 200, success: true, message: 'Removed from favorites', data: null });
});

const getFavorites = catchAsync(async (req: Request, res: Response) => {
  const result = await FavoriteServices.getFavorites(req.user.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Favorites retrieved', data: result });
});

const isFavorite = catchAsync(async (req: Request, res: Response) => {
  const result = await FavoriteServices.isFavorite(req.user.id, req.params.technicianId as string);
  sendResponse(res, { statusCode: 200, success: true, message: 'Favorite status retrieved', data: result });
});

export const FavoriteControllers = {
  addFavorite,
  removeFavorite,
  getFavorites,
  isFavorite,
};
