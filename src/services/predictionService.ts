// predictionService.ts
import prisma from "../database/prisma";

export const createPrediction = async (
  predUserId: number,
  predMatchId: number,
  predTeamName: string,
  predTeamOpponent: string,
  predValue: number,
  predTotalValue: number
) => {
  try {
    // check wallet balance and update it
    const user = await prisma.user.findFirst({
      where: {
        userId: predUserId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.userWalletBalance < predTotalValue) {
      throw new Error("Insufficient balance");
    }

    const updatedUser = await prisma.user.update({
      where: {
        userId: predUserId,
      },
      data: {
        userWalletBalance: {
          decrement: predTotalValue,
        },
      },
    });

    if (!updatedUser) {
      throw new Error("User not found");
    }

    const newPrediction = await prisma.prediction.create({
      data: {
        predTeamName,
        predTeamOpponent,
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
