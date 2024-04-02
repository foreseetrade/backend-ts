// appInfoRoutes.ts
import express, { Request, Response } from "express";
import * as legalsService from "../services/legalsService";
const router = express.Router();

router.post("/legals-info", async (req, res) => {
  const { privacy, terms } = req.body;

  try {
    const newLegalInfo = await legalsService.createLegal(privacy, terms);
    res.status(201).json(newLegalInfo);
  } catch (error) {
    console.error("Error creating app information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/legals-info", async (req, res) => {
  try {
    const appInfoList = await legalsService.getAllLegalsInfo();
    res.status(200).json(appInfoList);
  } catch (error) {
    console.error("Error fetching app information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
