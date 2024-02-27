// appInfoService.ts
import prisma from '../database/prisma';

export const createAppInfo = async (appName: string, appVersion: string): Promise<any> => {
  try {
    const newAppInfo = await prisma.appInformation.create({
      data: {
        appName,
        appVersion,
      },
    });

    return newAppInfo;
  } catch (error) {
    throw new Error('Error creating app information');
  }
};

export const getAllAppInfo = async (): Promise<any> => {
  try {
    const appInfoList = await prisma.appInformation.findMany();
    return appInfoList;
  } catch (error) {
    throw new Error('Error fetching app information');
  }
};
