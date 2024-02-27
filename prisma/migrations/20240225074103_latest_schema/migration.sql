/*
  Warnings:

  - The primary key for the `Match` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `teamA` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `teamB` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `venue` on the `Match` table. All the data in the column will be lost.
  - The primary key for the `Prediction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Prediction` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Prediction` table. All the data in the column will be lost.
  - You are about to drop the column `matchId` on the `Prediction` table. All the data in the column will be lost.
  - You are about to drop the column `prediction` on the `Prediction` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Prediction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Prediction` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Prediction` table. All the data in the column will be lost.
  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `buyerId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `predictionId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `sellerId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Transaction` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `testField` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[matchNo]` on the table `Match` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userPhone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `matchDate` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchNo` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchStatus` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchSummary` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchTeamA` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchTeamALogoUrl` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchTeamAOdds` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchTeamAOvers` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchTeamARunRate` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchTeamAScore` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchTeamAWickets` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchTeamAWinPrecentage` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchTeamB` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchTeamBLogoUrl` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchTeamBOdds` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchTeamBOvers` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchTeamBRunRate` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchTeamBScore` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchTeamBWickets` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchToss` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchVenue` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchWinner` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `predMatchId` to the `Prediction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `predPrediction` to the `Prediction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `predQuantity` to the `Prediction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `predTotalValue` to the `Prediction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `predUserId` to the `Prediction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `predValue` to the `Prediction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionAmount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionType` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionUserId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userPhone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_matchId_fkey";

-- DropForeignKey
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_predictionId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_sellerId_fkey";

-- AlterTable
ALTER TABLE "Match" DROP CONSTRAINT "Match_pkey",
DROP COLUMN "date",
DROP COLUMN "id",
DROP COLUMN "teamA",
DROP COLUMN "teamB",
DROP COLUMN "venue",
ADD COLUMN     "matchCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "matchDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "matchId" SERIAL NOT NULL,
ADD COLUMN     "matchNo" INTEGER NOT NULL,
ADD COLUMN     "matchStatus" TEXT NOT NULL,
ADD COLUMN     "matchSummary" TEXT NOT NULL,
ADD COLUMN     "matchTeamA" TEXT NOT NULL,
ADD COLUMN     "matchTeamALogoUrl" TEXT NOT NULL,
ADD COLUMN     "matchTeamAOdds" TEXT NOT NULL,
ADD COLUMN     "matchTeamAOvers" TEXT NOT NULL,
ADD COLUMN     "matchTeamARunRate" TEXT NOT NULL,
ADD COLUMN     "matchTeamAScore" TEXT NOT NULL,
ADD COLUMN     "matchTeamAWickets" TEXT NOT NULL,
ADD COLUMN     "matchTeamAWinPrecentage" TEXT NOT NULL,
ADD COLUMN     "matchTeamB" TEXT NOT NULL,
ADD COLUMN     "matchTeamBLogoUrl" TEXT NOT NULL,
ADD COLUMN     "matchTeamBOdds" TEXT NOT NULL,
ADD COLUMN     "matchTeamBOvers" TEXT NOT NULL,
ADD COLUMN     "matchTeamBRunRate" TEXT NOT NULL,
ADD COLUMN     "matchTeamBScore" TEXT NOT NULL,
ADD COLUMN     "matchTeamBWickets" TEXT NOT NULL,
ADD COLUMN     "matchToss" TEXT NOT NULL,
ADD COLUMN     "matchUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "matchVenue" TEXT NOT NULL,
ADD COLUMN     "matchWinner" TEXT NOT NULL,
ADD CONSTRAINT "Match_pkey" PRIMARY KEY ("matchId");

-- AlterTable
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "matchId",
DROP COLUMN "prediction",
DROP COLUMN "quantity",
DROP COLUMN "userId",
DROP COLUMN "value",
ADD COLUMN     "predCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "predId" SERIAL NOT NULL,
ADD COLUMN     "predMatchId" INTEGER NOT NULL,
ADD COLUMN     "predPrediction" BOOLEAN NOT NULL,
ADD COLUMN     "predQuantity" INTEGER NOT NULL,
ADD COLUMN     "predStatus" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "predTotalValue" INTEGER NOT NULL,
ADD COLUMN     "predUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "predUserId" INTEGER NOT NULL,
ADD COLUMN     "predValue" INTEGER NOT NULL,
ADD COLUMN     "predWin" BOOLEAN NOT NULL DEFAULT false,
ADD CONSTRAINT "Prediction_pkey" PRIMARY KEY ("predId");

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
DROP COLUMN "buyerId",
DROP COLUMN "id",
DROP COLUMN "predictionId",
DROP COLUMN "price",
DROP COLUMN "sellerId",
DROP COLUMN "timestamp",
ADD COLUMN     "transactionAmount" INTEGER NOT NULL,
ADD COLUMN     "transactionCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "transactionId" SERIAL NOT NULL,
ADD COLUMN     "transactionPredId" INTEGER,
ADD COLUMN     "transactionType" TEXT NOT NULL,
ADD COLUMN     "transactionUserId" INTEGER NOT NULL,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transactionId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "password",
DROP COLUMN "testField",
DROP COLUMN "username",
ADD COLUMN     "userCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userDOB" TIMESTAMP(3),
ADD COLUMN     "userEmail" TEXT NOT NULL,
ADD COLUMN     "userId" SERIAL NOT NULL,
ADD COLUMN     "userLosses" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "userName" TEXT,
ADD COLUMN     "userPfpUrl" TEXT,
ADD COLUMN     "userPhone" TEXT NOT NULL,
ADD COLUMN     "userTrades" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "userWalletBalance" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "userWins" INTEGER NOT NULL DEFAULT 0,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "Notification" (
    "notifId" SERIAL NOT NULL,
    "notifUserId" INTEGER NOT NULL,
    "notifMessage" TEXT NOT NULL,
    "notifType" TEXT NOT NULL,
    "notifCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notifId")
);

-- CreateTable
CREATE TABLE "Topup" (
    "topupId" SERIAL NOT NULL,
    "topupUserId" INTEGER NOT NULL,
    "topupAmount" INTEGER NOT NULL,
    "topupCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Topup_pkey" PRIMARY KEY ("topupId")
);

-- CreateTable
CREATE TABLE "Withdraw" (
    "withdrawId" SERIAL NOT NULL,
    "withdrawUserId" INTEGER NOT NULL,
    "withdrawAmount" INTEGER NOT NULL,
    "withdrawCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Withdraw_pkey" PRIMARY KEY ("withdrawId")
);

-- CreateTable
CREATE TABLE "Investment" (
    "investmentId" SERIAL NOT NULL,
    "investmentUserId" INTEGER NOT NULL,
    "investmentAmount" INTEGER NOT NULL,
    "investmentCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("investmentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Match_matchNo_key" ON "Match"("matchNo");

-- CreateIndex
CREATE UNIQUE INDEX "User_userPhone_key" ON "User"("userPhone");

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_predUserId_fkey" FOREIGN KEY ("predUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_predMatchId_fkey" FOREIGN KEY ("predMatchId") REFERENCES "Match"("matchId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_notifUserId_fkey" FOREIGN KEY ("notifUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topup" ADD CONSTRAINT "Topup_topupUserId_fkey" FOREIGN KEY ("topupUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Withdraw" ADD CONSTRAINT "Withdraw_withdrawUserId_fkey" FOREIGN KEY ("withdrawUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_investmentUserId_fkey" FOREIGN KEY ("investmentUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transactionUserId_fkey" FOREIGN KEY ("transactionUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transactionPredId_fkey" FOREIGN KEY ("transactionPredId") REFERENCES "Prediction"("predId") ON DELETE SET NULL ON UPDATE CASCADE;
