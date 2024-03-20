/*
  Warnings:

  - You are about to drop the column `withdrawRefId` on the `Withdraw` table. All the data in the column will be lost.
  - Added the required column `predTeamName` to the `Prediction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `withdrawBankingName` to the `Withdraw` table without a default value. This is not possible if the table is not empty.
  - Added the required column `withdrawUpiId` to the `Withdraw` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prediction" ADD COLUMN     "predTeamName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Topup" ADD COLUMN     "topupAppName" TEXT,
ADD COLUMN     "topupBankingName" TEXT,
ADD COLUMN     "topupInappUserName" TEXT;

-- AlterTable
ALTER TABLE "Withdraw" DROP COLUMN "withdrawRefId",
ADD COLUMN     "withdrawBankingName" TEXT NOT NULL,
ADD COLUMN     "withdrawUpiId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "HelpNSupport" (
    "helpId" SERIAL NOT NULL,
    "helpUserId" INTEGER NOT NULL,
    "helpMessage" TEXT NOT NULL,
    "helpStatus" TEXT NOT NULL DEFAULT 'pending',
    "helpCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HelpNSupport_pkey" PRIMARY KEY ("helpId")
);

-- AddForeignKey
ALTER TABLE "HelpNSupport" ADD CONSTRAINT "HelpNSupport_helpUserId_fkey" FOREIGN KEY ("helpUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
