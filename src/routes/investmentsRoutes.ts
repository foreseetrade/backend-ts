// investmentRoutes.ts
import express, { Request, Response } from 'express';
import * as investmentService from '../services/investmentService';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = express.Router();

router.post('/investments', authenticateToken, async (req, res) => {
  const { investmentUserId, investmentAmount } = req.body;

  try {
    const newInvestment = await investmentService.createInvestment(investmentUserId, investmentAmount);
    res.status(201).json(newInvestment);
  } catch (error) {
    console.error('Error creating investment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/users/:userId/investments', authenticateToken, async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  try {
    const userInvestments = await investmentService.getUserInvestments(userId);
    res.status(200).json(userInvestments);
  } catch (error) {
    console.error('Error fetching user investments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
