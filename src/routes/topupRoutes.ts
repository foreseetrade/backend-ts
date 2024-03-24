// topupRoutes.ts
import express, { Request, Response } from "express";
import * as topupService from "../services/topupService";

const router = express.Router();

router.post("/new", async (req, res) => {
  const {
    topupUserId,
    topupAmount,
    topUpRefId,
    topupAppName,
    topupPhNumber,
    topupBankingName,
    topupInappUserName,
  } = req.body;

  try {
    const newTopup = await topupService.createTopup(
      topupUserId,
      topupAmount,
      "pending",
      topUpRefId,
      topupAppName,
      topupPhNumber,
      topupBankingName,
      topupInappUserName
    );
    res.status(201).json(newTopup);
  } catch (error) {
    console.error("Error creating top-up:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const topupList = await topupService.getAllTopups();
    res.status(200).json(topupList);
  } catch (error) {
    console.error("Error fetching top-ups:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user", async (req, res) => {
  const userId = req.query.userId;
  const intUserId = parseInt(userId as string, 10);

  try {
    const userTopups = await topupService.getUserTopups(intUserId);
    res.status(200).json(userTopups);
  } catch (error) {
    console.error("Error fetching user top-ups:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
