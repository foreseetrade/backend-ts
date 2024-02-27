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

// Create a top-up
router.post('/topups', authenticateToken, async (req, res) => {
    const { topupUserId, topupAmount } = req.body;
  
    try {
      const newTopup = await prisma.topup.create({
        data: {
          topupUserId,
          topupAmount,
        },
      });
  
      res.status(201).json(newTopup);
    } catch (error) {
      console.error('Error creating top-up:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get user's top-ups
  router.get('/users/:userId/topups', authenticateToken, async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
  
    try {
      const userTopups = await prisma.topup.findMany({
        where: { topupUserId: userId },
      });
  
      res.status(200).json(userTopups);
    } catch (error) {
      console.error('Error fetching user top-ups:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  