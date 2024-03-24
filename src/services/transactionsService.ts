import prisma from "../database/prisma";

export const getAllTransactions = async (userId: any) => {
  try {
    const topups = await prisma.topup.findMany({
      where: { topupUserId: userId },
    });

    const withdrawals = await prisma.withdraw.findMany({
      where: { withdrawUserId: userId },
    });

    const predictions = await prisma.prediction.findMany({
      where: { predUserId: userId },
    });
    const transactions = [...topups, ...withdrawals, ...predictions];
    return transactions;
  } catch (error) {
    throw new Error("Error fetching transactions");
  }
};
