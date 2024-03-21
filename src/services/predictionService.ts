// predictionService.ts
import prisma from "../database/prisma";

export const createPrediction = async (
  predUserId: number,
  predMatchId: number,
  predTeamName: string,
  predValue: number,
  predTotalValue: number
) => {
  try {
    const newPrediction = await prisma.prediction.create({
      data: {
        predUserId,
        predMatchId,
        predTeamName,
        predQuantity: predTotalValue / predValue,
        predValue,
        predTotalValue,
      } as any,
    });

    return newPrediction;
  } catch (error) {
    console.error("Error creating prediction:", error);
    return error;
  }
};

export const getUserPredictions = async (userId: number) => {
  try {
    const userPredictions = await prisma.prediction.findMany({
      where: { predUserId: userId },
    });

    return userPredictions;
  } catch (error) {
    console.error("Error fetching user predictions:", error);
    return error;
  }
};
