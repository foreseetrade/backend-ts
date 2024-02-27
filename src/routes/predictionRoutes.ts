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
import { authenticateToken } from "../middlewares/authenticateToken";

// Create a prediction
router.post("/predictions", authenticateToken, async (req, res) => {
  const {
    predUserId,
    predMatchId,
    predPrediction,
    predQuantity,
    predValue,
    predTotalValue,
    predUser,
    predMatch,
  } = req.body;

  try {
    const newPrediction = await prisma.prediction.create({
      data: {
        predUserId,
        predMatchId,
        predPrediction,
        predQuantity,
        predValue,
        predTotalValue, // Add predTotalValue property
        predUser, // Add predUser property
        predMatch, // Add predMatch property
      },
    });

    res.status(201).json(newPrediction);
  } catch (error) {
    console.error("Error creating prediction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get user's predictions
router.get(
  "/users/:userId/predictions",
  authenticateToken,
  async (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    try {
      const userPredictions = await prisma.prediction.findMany({
        where: { predUserId: userId },
      });

      res.status(200).json(userPredictions);
    } catch (error) {
      console.error("Error fetching user predictions:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
