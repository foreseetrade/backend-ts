// topupService.ts

import prisma from "../database/prisma";

export const createTopup = async (
  topupUserId: number,
  topupAmount: number,
  topupStatus: string,
  topupRefId: string,
  topupAppName: string,
  topupPhNumber: string,
  topupBankingName: string,
  topupInappUserName: string
) => {
  try {
    const newTopup = await prisma.topup.create({
      data: {
        topupUserId,
        topupAmount,
        topupStatus,
        topupRefId,
        topupAppName,
        topupPhNumber,
        topupBankingName,
        topupInappUserName,
        topupUser: {
          connect: {
            userId: topupUserId,
          },
        } as any,
      },
    });

    return newTopup;
  } catch (error) {
    console.error("Error creating top-up:", error);
    throw new Error("Error creating top-up");
  }
};

export const getUserTopups = async (userId: number) => {
  try {
    const userTopups = await prisma.topup.findMany({
      where: { topupUserId: userId },
    });

    return userTopups;
  } catch (error) {
    throw new Error("Error fetching user top-ups");
  }
};

export const getAllTopups = async () => {
  try {
    const topupList = await prisma.topup.findMany();
    return topupList;
  } catch (error) {
    throw new Error("Error fetching top-ups");
  }
};
