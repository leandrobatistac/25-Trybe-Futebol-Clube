import { Router } from 'express';
import leaderboardController from '../controller/leaderboard.away.controller';

const leaderBoardAway = Router();

leaderBoardAway.get('/', leaderboardController.getAllMatches);

export default leaderBoardAway;
