// withdrawService.ts

import prisma from "../database/prisma";

export const createWithdrawal = async (
  withdrawUserId: number,
  withdrawAmount: number,
  withdrawRefId: string,
  withdrawStatus?: string,
  withdrawPhNumber?: string
) => {
  try {
    const newWithdrawal = await prisma.withdraw.create({
      data: {
        withdrawUserId,
        withdrawAmount,
        withdrawRefId,
        withdrawStatus,
        withdrawPhNumber: withdrawPhNumber || '',
      },
    });

    return newWithdrawal;
  } catch (error) {
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
