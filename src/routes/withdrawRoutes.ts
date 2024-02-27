// src/routes/withdrawRoutes.ts
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

// Create a withdrawal
router.post('/withdrawals', authenticateToken, async (req, res) => {
    const { withdrawUserId, withdrawAmount } = req.body;
  
    try {
      const newWithdrawal = await prisma.withdraw.create({
        data: {
          withdrawUserId,
          withdrawAmount,
        },
      });
  
      res.status(201).json(newWithdrawal);
    } catch (error) {
      console.error('Error creating withdrawal:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get user's withdrawals
  router.get('/users/:userId/withdrawals', authenticateToken, async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
  
    try {
      const userWithdrawals = await prisma.withdraw.findMany({
        where: { withdrawUserId: userId },
      });
  
      res.status(200).json(userWithdrawals);
    } catch (error) {
      console.error('Error fetching user withdrawals:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  