import express from 'express';
import { NotificationControllers } from './notification.controller.js';
import { auth } from '../../../middlewares/auth.js';

const router = express.Router();

router.get('/', auth(), NotificationControllers.getNotifications);
router.get('/unread-count', auth(), NotificationControllers.getUnreadCount);
router.patch('/read-all', auth(), NotificationControllers.markAllAsRead);
router.patch('/:id/read', auth(), NotificationControllers.markAsRead);
router.delete('/:id', auth(), NotificationControllers.deleteNotification);

export const NotificationRoutes = router;
