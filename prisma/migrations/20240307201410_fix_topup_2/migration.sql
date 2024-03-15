/*
  Warnings:

  - You are about to drop the `Investment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `withdrawPhNumber` to the `Withdraw` table without a default value. This is not possible if the table is not empty.
  - Added the required column `withdrawRefId` to the `Withdraw` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Investment" DROP CONSTRAINT "Investment_investmentUserId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_transactionPredId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_transactionUserId_fkey";

-- AlterTable
ALTER TABLE "Topup" ADD COLUMN     "topupPhNumber" TEXT,
ADD COLUMN     "topupRefId" TEXT,
ADD COLUMN     "topupStatus" TEXT NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "Withdraw" ADD COLUMN     "withdrawPhNumber" TEXT NOT NULL,
ADD COLUMN     "withdrawRefId" TEXT NOT NULL,
ADD COLUMN     "withdrawStatus" TEXT NOT NULL DEFAULT 'pending';

-- DropTable
DROP TABLE "Investment";

-- DropTable
DROP TABLE "Transaction";
