// investmentService.ts

import prisma from "../database/prisma";

export const createInvestment = async (
  investmentUserId: number,
  investmentAmount: number
) => {
  try {
    const newInvestment = await prisma.investment.create({
      data: {
        investmentUserId,
        investmentAmount,
      },
    });

    return newInvestment;
  } catch (error) {
    throw new Error("Error creating investment");
  }
};

export const getUserInvestments = async (userId: number) => {
  try {
    const userInvestments = await prisma.investment.findMany({
      where: { investmentUserId: userId },
    });

    return userInvestments;
  } catch (error) {
    throw new Error("Error fetching user investments");
  }
};
