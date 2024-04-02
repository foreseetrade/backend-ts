// appInfoService.ts
import prisma from "../database/prisma";

export const createLegal = async (
  privacy: string,
  terms: string
): Promise<any> => {
  try {
    const newAppInfo = await prisma.legals.create({
      data: {
        privacy,
        terms,
      },
    });

    return newAppInfo;
  } catch (error) {
    throw new Error("Error creating app information");
  }
};

export const getAllLegalsInfo = async (): Promise<any> => {
  try {
    const legalsInfo = await prisma.legals.findMany();
    return legalsInfo;
  } catch (error) {
    throw new Error("Error fetching app information");
  }
};
