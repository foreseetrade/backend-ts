// src/services/predictionService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PredictionService {
  async createPrediction(userId: number, matchId: number, outcome: boolean, quantity: number) {
    return prisma.prediction.create({
      data: {
        userId,
        matchId,
        outcome,
        quantity,
        value: 0, // Initial value, update as needed
      },
    });
  }

}
