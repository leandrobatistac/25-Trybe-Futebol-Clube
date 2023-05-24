import { Router } from 'express';
import leaderboardController from '../controller/leaderboard.controller';

const teamsRoute = Router();

teamsRoute.get('/home', leaderboardController.getAllMatches);

export default teamsRoute;
