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


// Create a transaction
router.post('/transactions', authenticateToken, async (req, res) => {
    const { transactionUserId, transactionAmount, transactionType, transactionPredId } = req.body;
  
    try {
      const newTransaction = await prisma.transaction.create({
        data: {
          transactionUserId,
          transactionAmount,
          transactionType,
          transactionPredId,
        },
      });
  
      res.status(201).json(newTransaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get user's transactions
  router.get('/users/:userId/transactions', authenticateToken, async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
  
    try {
      const userTransactions = await prisma.transaction.findMany({
        where: { transactionUserId: userId },
      });
  
      res.status(200).json(userTransactions);
    } catch (error) {
      console.error('Error fetching user transactions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });