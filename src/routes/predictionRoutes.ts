// predictionRoutes.ts
import express, { Request, Response } from "express";
import { authenticateToken } from "../middlewares/authenticateToken";
import * as predictionService from "../services/predictionService";

const router = express.Router();

router.post("/new", authenticateToken, async (req, res) => {
  const { predUserId, predMatchId, predTeamName, predTotalValue, predValue } =
    req.body;

  try {
    const newPrediction = await predictionService.createPrediction(
      predUserId,
      predMatchId,
      predTeamName,
      predValue,
      predTotalValue
    );
    res.status(201).json(newPrediction);
  } catch (error) {
    console.error("Error creating prediction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user", authenticateToken, async (req, res) => {
  const userId = parseInt(req.query.userId as string, 10);

  try {
    const userPredictions = await predictionService.getUserPredictions(userId);
    res.status(200).json(userPredictions);
  } catch (error) {
    console.error("Error fetching user predictions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
