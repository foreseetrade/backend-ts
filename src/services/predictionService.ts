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
        predUser: {
          connect: {
            userId: predUserId,
          },
        },
        predMatch: {
          connect: {
            matchId: predMatchId,
          },
        },
      } as any,
    });

    return newPrediction;
  } catch (error) {
    console.error("Error creating prediction:", error);
    return error;
  }
};

export const getUserPredictions = async (userEmail: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { userEmail },
    });
    const userPredictions = await prisma.prediction.findMany({
      where: { predUserId: user?.userId },
    });

    return userPredictions;
  } catch (error) {
    console.error("Error fetching user predictions:", error);
    return error;
  }
};
