// withdrawRoutes.ts
import express, { Request, Response } from "express";
import { authenticateToken } from "../middlewares/authenticateToken";
import * as withdrawService from "../services/withdrawService";

const router = express.Router();

router.post("/withdrawals", authenticateToken, async (req, res) => {
  const {
    withdrawUserId,
    withdrawAmount,
    withdrawRefId,
    withdrawStatus,
    withdrawPhNumber,
  } = req.body;

  try {
    const newWithdrawal = await withdrawService.createWithdrawal(
      withdrawUserId,
      withdrawAmount,
      withdrawRefId,
      withdrawStatus,
      withdrawPhNumber
    );
    res.status(201).json(newWithdrawal);
  } catch (error) {
    console.error("Error creating withdrawal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get(
  "/users/:userId/withdrawals",
  authenticateToken,
  async (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    try {
      const userWithdrawals = await withdrawService.getUserWithdrawals(userId);
      res.status(200).json(userWithdrawals);
    } catch (error) {
      console.error("Error fetching user withdrawals:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default router;
