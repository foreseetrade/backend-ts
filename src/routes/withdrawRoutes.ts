// withdrawRoutes.ts
import express, { Request, Response } from "express";
import { authenticateToken } from "../middlewares/authenticateToken";
import * as withdrawService from "../services/withdrawService";

const router = express.Router();

router.post("/new", async (req, res) => {
  const {
    withdrawUserId,
    withdrawAmount,
    withdrawStatus,
    withdrawPhNumber,
    withdrawUpiId,
    withdrawBankingName,
  } = req.body;

  try {
    const newWithdrawal = await withdrawService.createWithdrawal(
      withdrawUserId,
      withdrawAmount,
      withdrawStatus,
      withdrawPhNumber,
      withdrawUpiId,
      withdrawBankingName
    );
    res.status(201).json(newWithdrawal);
  } catch (error) {
    console.error("Error creating withdrawal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user", async (req, res) => {
  const userId = parseInt(req?.query?.userId as string, 10);

  try {
    const userWithdrawals = await withdrawService.getUserWithdrawals(userId);
    res.status(200).json(userWithdrawals);
  } catch (error) {
    console.error("Error fetching user withdrawals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
