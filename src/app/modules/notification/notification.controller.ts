import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync.js';
import { sendResponse } from '../../../utils/sendResponse.js';
import { NotificationServices } from './notification.service.js';

const getNotifications = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationServices.getNotifications(req.user.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Notifications retrieved', data: result });
});

const getUnreadCount = catchAsync(async (req: Request, res: Response) => {
  const count = await NotificationServices.getUnreadCount(req.user.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Unread count retrieved', data: { count } });
});

const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationServices.markAsRead(req.params.id as string, req.user.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Notification marked as read', data: result });
});

const markAllAsRead = catchAsync(async (req: Request, res: Response) => {
  await NotificationServices.markAllAsRead(req.user.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'All notifications marked as read', data: null });
});

const deleteNotification = catchAsync(async (req: Request, res: Response) => {
  await NotificationServices.deleteNotification(req.params.id as string, req.user.id);
  sendResponse(res, { statusCode: 200, success: true, message: 'Notification deleted', data: null });
});

export const NotificationControllers = {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
