// src/services/transactionService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TransactionService {
  async createTransaction(buyerId: number, sellerId: number, predictionId: number, price: number) {
    return prisma.purchase.create({
      data: {
        buyerId,
        sellerId,
        predictionId,
        price,
      },
    });
  }

}
