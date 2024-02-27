// transactionService.ts

import prisma from "../database/prisma";

export const createTransaction = async (
  transactionUserId: number,
  transactionAmount: number,
  transactionType: string,
  transactionPredId?: number
) => {
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        transactionUserId,
        transactionAmount,
        transactionType,
        transactionPredId,
      },
    });

    return newTransaction;
  } catch (error) {
    throw new Error('Error creating transaction');
  }
};

export const getUserTransactions = async (userId: number) => {
  try {
    const userTransactions = await prisma.transaction.findMany({
      where: { transactionUserId: userId },
    });

    return userTransactions;
  } catch (error) {
    throw new Error('Error fetching user transactions');
  }
};
