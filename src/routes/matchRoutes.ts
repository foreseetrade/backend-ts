// src/routes/matchRoutes.ts
import express from "express";
import {
  envOTPLESS_CLIENT_ID,
  envOTPLESS_CLIENT_SECRET,
  envJWTSecretKey,
} from "../config";
import jwt from "jsonwebtoken";
const router = express.Router();
import prisma from "../database/prisma";

// Get all matches
router.get('/matches', async (req, res) => {
    try {
      const matches = await prisma.match.findMany();
      res.status(200).json(matches);
    } catch (error) {
      console.error('Error fetching matches:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get match by ID
  router.get('/matches/:id', async (req, res) => {
    const matchId = parseInt(req.params.id, 10);
  
    try {
      const match = await prisma.match.findUnique({
        where: { matchId },
      });
  
      if (!match) {
        return res.status(404).json({ error: 'Match not found' });
      }
  
      res.status(200).json(match);
    } catch (error) {
      console.error('Error fetching match by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });