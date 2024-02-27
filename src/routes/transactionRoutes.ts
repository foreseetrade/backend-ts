// transactionRoutes.ts
import express, { Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import * as transactionService from '../services/transactionService';

const router = express.Router();

router.post('/transactions', authenticateToken, async (req, res) => {
  const { transactionUserId, transactionAmount, transactionType, transactionPredId } = req.body;

  try {
    const newTransaction = await transactionService.createTransaction(
      transactionUserId,
      transactionAmount,
      transactionType,
      transactionPredId
    );
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/users/:userId/transactions', authenticateToken, async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  try {
    const userTransactions = await transactionService.getUserTransactions(userId);
    res.status(200).json(userTransactions);
  } catch (error) {
    console.error('Error fetching user transactions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
