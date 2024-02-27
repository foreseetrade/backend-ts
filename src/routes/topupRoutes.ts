// topupRoutes.ts
import express, { Request, Response } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken';
import * as topupService from '../services/topupService';

const router = express.Router();

router.post('/topups', authenticateToken, async (req, res) => {
  const { topupUserId, topupAmount } = req.body;

  try {
    const newTopup = await topupService.createTopup(topupUserId, topupAmount);
    res.status(201).json(newTopup);
  } catch (error) {
    console.error('Error creating top-up:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/users/:userId/topups', authenticateToken, async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  try {
    const userTopups = await topupService.getUserTopups(userId);
    res.status(200).json(userTopups);
  } catch (error) {
    console.error('Error fetching user top-ups:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
