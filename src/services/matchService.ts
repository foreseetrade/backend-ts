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

export const getMatchByMatchNo = async (matchNo: number) => {
  try {
    const match = await prisma.match.findUnique({
      where: { matchNo },
    });

    if (!match) {
      return null;
    }

    return match;
  } catch (error) {
    console.error("Error fetching match by MatchNo:", error);
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

export const updateMatch = async (matchNo: number, match: any) => {
  try {
    const updatedMatch = await prisma.match.update({
      where: { matchNo },
      data: match,
    });
    return updatedMatch;
  } catch (error) {
    console.error("Error updating match:", error);
    return error;
  }
};

export const getTrendingMatches = async () => {
  try {
    const matches = await prisma.match.findMany({
      where: { isTrending: true },
    });
    return matches;
  } catch (error) {
    console.error("Error fetching trending matches:", error);
    return error;
  }
};

export const getMatchesByTags = async (tags: string) => {
  try {
    const matches = await prisma.match.findMany({
      where: { tags: { has: tags } },
    });
    return matches;
  } catch (error) {
    console.error("Error fetching matches by tags:", error);
    return error;
  }
};

// Get matches by team if teamA contains the team or teamB contains the team
export const getMatchesByTeam = async (team: string) => {
  try {
    const matches = await prisma.match.findMany({
      where: {
        OR: [
          { matchTeamA: { contains: team } },
          { matchTeamB: { contains: team } },
        ],
      },
    });
    return matches;
  } catch (error) {
    console.error("Error fetching matches by team:", error);
    return error;
  }
};

// Get matches by Live or Upcoming or Trending
export const getMatchesByStatus = async (status: string) => {
  try {
    const matches = await prisma.match.findMany({
      where: { matchStatus: status },
    });
    return matches;
  } catch (error) {
    console.error("Error fetching matches by status:", error);
    return error;
  }
};
