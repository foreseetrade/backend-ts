-- CreateTable
CREATE TABLE "AppInformation" (
    "appId" SERIAL NOT NULL,
    "appName" TEXT NOT NULL,
    "appVersion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppInformation_pkey" PRIMARY KEY ("appId")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "faqId" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("faqId")
);
