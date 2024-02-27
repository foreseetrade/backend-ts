// notificationService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createNotification = async (notifUserId: number, notifMessage: string, notifType: string) => {
  try {
    const newNotification = await prisma.notification.create({
      data: {
        notifUserId,
        notifMessage,
        notifType,
      },
    });

    return newNotification;
  } catch (error) {
    throw new Error('Error creating notification');
  }
};

export const getUserNotifications = async (userId: number) => {
  try {
    const userNotifications = await prisma.notification.findMany({
      where: { notifUserId: userId },
    });

    return userNotifications;
  } catch (error) {
    throw new Error('Error fetching user notifications');
  }
};
