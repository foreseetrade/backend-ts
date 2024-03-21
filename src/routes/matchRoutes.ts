// matchRoutes.ts
import express, { Request, Response } from "express";
import * as matchService from "../services/matchService";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const matches = await matchService.getAllMatches();
    console.log("Matches:", matches);
    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("", async (req, res) => {
  const matchNo = parseInt(req?.query?.matchNo as string, 10);

  try {
    const match = await matchService.getMatchByMatchNo(matchNo);
    console.log("Match:", match);
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }
    res.status(200).json(match);
  } catch (error) {
    console.error("Error fetching match by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update", async (req, res) => {
  const matchId = parseInt(req.query.matchNo as string, 10);
  const updatedMatchData = req.body;

  try {
    const updatedMatch = await matchService.updateMatch(
      matchId,
      updatedMatchData
    );
    res.status(200).json({
      message: "Match updated successfully",
      status: "success",
      updatedMatch,
    });
  } catch (error) {
    console.error("Error updating match:", error);
    res.status(500).json({ message: "Internal Server Error", status: "error" });
  }
});

router.post("/new", async (req, res) => {
  const newMatchData = req.body;

  try {
    const newMatch = await matchService.createMatch(newMatchData);
    res.status(201).json({
      message: "Match created successfully",
      status: "success",
      newMatch,
    });
  } catch (error) {
    console.error("Error creating match:", error);
    res.status(500).json({ message: "Internal Server Error", status: "error" });
  }
});

// Get trending Matches :
router.get("/trending", async (req, res) => {
  try {
    const matches = await matchService.getTrendingMatches();
    console.log("Matches:", matches);
    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get matches by tags
router.get("/tags", async (req, res) => {
  const tags = req.query.tags as string;
  try {
    const matches = await matchService.getMatchesByTags(tags);
    console.log("Matches:", matches);
    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get matches by team
router.get("/team", async (req, res) => {
  const team = req.query.team as string;
  try {
    const matches = await matchService.getMatchesByTeam(team);
    console.log("Matches:", matches);
    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get matches by status - isLive or isUpcoming  or isCompleted

router.get("/status", async (req, res) => {
  const status = req.query.status as string;
  try {
    const matches = await matchService.getMatchesByStatus(status);
    console.log("Matches:", matches);
    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
