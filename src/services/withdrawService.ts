// withdrawService.ts

import prisma from "../database/prisma";

export const createWithdrawal = async (
  withdrawUserId: number,
  withdrawAmount: number,
  withdrawStatus?: string,
  withdrawUpiId?: string,
  withdrawBankingName?: string,
  withdrawPhNumber?: string
) => {
  try {
    const newWithdrawal = await prisma.withdraw.create({
      data: {
        withdrawUserId,
        withdrawAmount,
        withdrawStatus,
        withdrawUpiId: withdrawUpiId || "",
        withdrawPhNumber: withdrawPhNumber || "",
        withdrawBankingName: withdrawBankingName || "",
        withdrawUser: {
          connect: {
            userId: withdrawUserId,
          },
        } as any,
      },
    });

    return newWithdrawal;
  } catch (error) {
    console.error("Error creating withdrawal:", error);
    throw new Error("Error creating withdrawal");
  }
};

export const getUserWithdrawals = async (userId: number) => {
  try {
    const userWithdrawals = await prisma.withdraw.findMany({
      where: { withdrawUserId: userId },
    });

    return userWithdrawals;
  } catch (error) {
    throw new Error("Error fetching user withdrawals");
  }
};
