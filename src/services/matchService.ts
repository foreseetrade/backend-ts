// matchService.ts
import prisma from "../database/prisma";

export const getAllMatches = async () => {
  try {
    const matches = await prisma.match.findMany();
    return matches;
  } catch (error) {
    // throw new Error("Error fetching matches" + error);
    console.error("Error fetching matches:", error);
    return error;
  }
};

export const getMatchById = async (matchId: number) => {
  try {
    const match = await prisma.match.findUnique({
      where: { matchId },
    });

    if (!match) {
      return null;
    }

    return match;
  } catch (error) {
    console.error("Error fetching match by ID:", error);
    return error;
  }
};

export const createMatch = async (match: any) => {
  try {
    const newMatch = await prisma.match.create({
      data: match,
    });
    return newMatch;
  } catch (error) {
    console.error("Error creating match:", error);
    return error;
  }
};

export const updateMatch = async (matchId: number, match: any) => {
  try {
    const updatedMatch = await prisma.match.update({
      where: { matchId },
      data: match,
    });
    return updatedMatch;
  } catch (error) {
    console.error("Error updating match:", error);
    return error;
  }
};
