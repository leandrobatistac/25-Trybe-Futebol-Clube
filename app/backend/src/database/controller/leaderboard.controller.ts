import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboard.service';

const getAllMatches = async (req: Request, res: Response) => {
  const allMatches = await leaderboardService.getAllTeamMatches();
  res.status(200).json(allMatches);
};

const leaderController = {
  getAllMatches,
};

export default leaderController;
