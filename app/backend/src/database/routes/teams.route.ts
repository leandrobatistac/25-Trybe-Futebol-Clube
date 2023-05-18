import { Router } from 'express';
import teamController from '../controller/teams.controller';

const teamsRoute = Router();

teamsRoute.get('/', teamController.getAllTeams);
teamsRoute.get('/:id', teamController.getTeamById);

export default teamsRoute;
