// predictionRoutes.ts
import express, { Request, Response } from "express";
import { authenticateToken } from "../middlewares/authenticateToken";
import * as predictionService from "../services/predictionService";

const router = express.Router();

router.post("/new", async (req, res) => {
  const {
    predUserId,
    predMatchId,
    predTeamName,
    predTeamOpponent,
    predTotalValue,
    predValue,
  } = req.body;

  try {
    const newPrediction = await predictionService.createPrediction(
      predUserId,
      predMatchId,
      predTeamName,
      predTeamOpponent,
      predValue,
      predTotalValue
    );
    res.status(201).json(newPrediction);
  } catch (error) {
    console.error("Error creating prediction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user", async (req, res) => {
  const userEmail = req.query.userEmail as string;

  try {
    const userPredictions = await predictionService.getUserPredictions(
      userEmail
    );
    res.status(200).json(userPredictions);
  } catch (error) {
    console.error("Error fetching user predictions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all transactions for a userEmail :
export default router;
