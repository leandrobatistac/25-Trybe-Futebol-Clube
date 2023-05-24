import { Router } from 'express';
import matchController from '../controller/matches.controller';
import tokenValidate from '../middlewares/tokenValidate';

const teamsRoute = Router();

teamsRoute.get('/', matchController.getAllMatches);
teamsRoute.patch('/:id/finish', tokenValidate, matchController.finishMatch);
teamsRoute.patch('/:id', tokenValidate, matchController.updateMatch);

export default teamsRoute;
