import express, { Request, Response } from "express";
import * as transactionService from "../services/transactionsService";
import * as userService from "../services/userService";

const router = express.Router();

router.get("/user", async (req, res) => {
  try {
    const userEmail = req.query.userEmail;

    const user = await userService.getUserByEmail(userEmail);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user?.userId;

    const transactions = await transactionService.getAllTransactions(userId);
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
