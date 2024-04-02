-- AlterTable
ALTER TABLE "Prediction" ADD COLUMN     "predCurrentValue" INTEGER;

-- CreateTable
CREATE TABLE "Legals" (
    "legalId" SERIAL NOT NULL,
    "privacy" TEXT,
    "terms" TEXT,
    "legalsCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "legalsUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Legals_pkey" PRIMARY KEY ("legalId")
);
