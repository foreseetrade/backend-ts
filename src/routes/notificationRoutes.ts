// src/routes/transactionRoutes.ts
import express from "express";
import {
  envOTPLESS_CLIENT_ID,
  envOTPLESS_CLIENT_SECRET,
  envJWTSecretKey,
} from "../config";
import jwt from "jsonwebtoken";
const router = express.Router();
import prisma from "../database/prisma";
import { authenticateToken } from "../middlewares/authenticateToken";

// Create a notification
router.post('/notifications', authenticateToken, async (req, res) => {
    const { notifUserId, notifMessage, notifType } = req.body;
  
    try {
      const newNotification = await prisma.notification.create({
        data: {
          notifUserId,
          notifMessage,
          notifType,
        },
      });
  
      res.status(201).json(newNotification);
    } catch (error) {
      console.error('Error creating notification:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get user's notifications
  router.get('/users/:userId/notifications', authenticateToken, async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
  
    try {
      const userNotifications = await prisma.notification.findMany({
        where: { notifUserId: userId },
      });
  
      res.status(200).json(userNotifications);
    } catch (error) {
      console.error('Error fetching user notifications:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  