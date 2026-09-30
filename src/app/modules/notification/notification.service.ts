import prisma from '../../../lib/prisma.js';

export type NotificationType =
  | 'BOOKING_REQUESTED'
  | 'BOOKING_ACCEPTED'
  | 'BOOKING_DECLINED'
  | 'BOOKING_CANCELLED'
  | 'BOOKING_PAID'
  | 'BOOKING_IN_PROGRESS'
  | 'BOOKING_COMPLETED'
  | 'REVIEW_RECEIVED'
  | 'PAYMENT_COMPLETED'
  | 'PAYMENT_FAILED';

interface CreateNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  actionUrl?: string;
}

export async function createNotification(input: CreateNotificationInput) {
  return prisma.notification.create({ data: input });
}

export async function createMany(inputs: CreateNotificationInput[]) {
  if (inputs.length === 0) return;
  return prisma.notification.createMany({ data: inputs });
}

const getNotifications = async (userId: string) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
};

const getUnreadCount = async (userId: string) => {
  return prisma.notification.count({ where: { userId, readAt: null } });
};

const markAsRead = async (notificationId: string, userId: string) => {
  const notification = await prisma.notification.findUnique({ where: { id: notificationId } });
  if (!notification) throw Object.assign(new Error('Notification not found'), { statusCode: 404 });
  if (notification.userId !== userId) throw Object.assign(new Error('Forbidden'), { statusCode: 403 });

  return prisma.notification.update({
    where: { id: notificationId },
    data: { readAt: new Date() },
  });
};

const markAllAsRead = async (userId: string) => {
  return prisma.notification.updateMany({
    where: { userId, readAt: null },
    data: { readAt: new Date() },
  });
};

const deleteNotification = async (notificationId: string, userId: string) => {
  const notification = await prisma.notification.findUnique({ where: { id: notificationId } });
  if (!notification) throw Object.assign(new Error('Notification not found'), { statusCode: 404 });
  if (notification.userId !== userId) throw Object.assign(new Error('Forbidden'), { statusCode: 403 });

  return prisma.notification.delete({ where: { id: notificationId } });
};

export const NotificationServices = {
  createNotification,
  createMany,
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
