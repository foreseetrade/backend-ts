// matchRoutes.ts
import express, { Request, Response } from 'express';
import * as matchService from '../services/matchService';

const router = express.Router();

router.get('/matches', async (req, res) => {
  try {
    const matches = await matchService.getAllMatches();
    res.status(200).json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/matches/:id', async (req, res) => {
  const matchId = parseInt(req.params.id, 10);

  try {
    const match = await matchService.getMatchById(matchId);
    res.status(200).json(match);
  } catch (error) {
    console.error('Error fetching match by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
