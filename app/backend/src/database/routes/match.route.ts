import { Router } from 'express';
import matchController from '../controller/matches.controller';

const teamsRoute = Router();

teamsRoute.get('/', matchController.getAllMatches);

export default teamsRoute;
