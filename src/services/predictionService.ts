// predictionService.ts
import prisma from "../database/prisma";

export const createPrediction = async (
  predUserId: number,
  predMatchId: number,
  predPrediction: boolean,
  predQuantity: number,
  predValue: number,
  predTotalValue: number
) => {
  try {
    const newPrediction = await prisma.prediction.create({
      data: {
        predUserId,
        predMatchId,
        predPrediction,
        predQuantity,
        predValue,
        predTotalValue: predQuantity * predValue,
      },
    });

    return newPrediction;
  } catch (error) {
    throw new Error("Error creating prediction");
  }
};

export const getUserPredictions = async (userId: number) => {
  try {
    const userPredictions = await prisma.prediction.findMany({
      where: { predUserId: userId },
    });

    return userPredictions;
  } catch (error) {
    throw new Error("Error fetching user predictions");
  }
};
