/*
  Warnings:

  - Added the required column `predTeamOpponent` to the `Prediction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prediction" ADD COLUMN     "predTeamOpponent" TEXT NOT NULL;
