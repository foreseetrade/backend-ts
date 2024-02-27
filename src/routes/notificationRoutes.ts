// notificationRoutes.ts
import express, { Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import * as notificationService from '../services/notificationService';

const router = express.Router();

router.post('/notifications', authenticateToken, async (req, res) => {
  const { notifUserId, notifMessage, notifType } = req.body;

  try {
    const newNotification = await notificationService.createNotification(notifUserId, notifMessage, notifType);
    res.status(201).json(newNotification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/users/:userId/notifications', authenticateToken, async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  try {
    const userNotifications = await notificationService.getUserNotifications(userId);
    res.status(200).json(userNotifications);
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
