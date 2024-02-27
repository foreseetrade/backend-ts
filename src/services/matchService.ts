// matchService.ts
import prisma from '../database/prisma';

export const getAllMatches = async () => {
  try {
    const matches = await prisma.match.findMany();
    return matches;
  } catch (error) {
    throw new Error('Error fetching matches');
  }
};

export const getMatchById = async (matchId: number) => {
  try {
    const match = await prisma.match.findUnique({
      where: { matchId },
    });

    if (!match) {
      throw new Error('Match not found');
    }

    return match;
  } catch (error) {
    throw new Error('Error fetching match by ID');
  }
};
