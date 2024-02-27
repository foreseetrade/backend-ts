// src/routes/investmentsRoutes.ts
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

// Create an investment
router.post("/investments", authenticateToken, async (req, res) => {
  const { investmentUserId, investmentAmount } = req.body;

  try {
    const newInvestment = await prisma.investment.create({
      data: {
        investmentUserId,
        investmentAmount,
      },
    });

    res.status(201).json(newInvestment);
  } catch (error) {
    console.error("Error creating investment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get user's investments
router.get(
  "/users/:userId/investments",
  authenticateToken,
  async (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    try {
      const userInvestments = await prisma.investment.findMany({
        where: { investmentUserId: userId },
      });

      res.status(200).json(userInvestments);
    } catch (error) {
      console.error("Error fetching user investments:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
