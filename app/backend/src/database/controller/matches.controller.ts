import { Request, Response, NextFunction } from 'express';
import matchService from '../services/matches.service';

const errorMessage = 'Token must be a valid token';
const equalTeamMessage = 'It is not possible to create a match with two equal teams';

const getAllMatches = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { inProgress } = req.query;
    const allMatches = await matchService.getAllMatches(inProgress);
    res.status(200).json(allMatches);
  } catch (error) {
    next(error);
  }
};

const finishMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization as string;
    await matchService.finishMatch(Number(id), token);
    res.status(200).json({ message: 'Finished' });
  } catch (error) {
    res.status(401).send({ message: errorMessage });
  }
};

const updateMatch = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;
    const match = await matchService.updateMatch(Number(id), token, homeTeamGoals, awayTeamGoals);
    res.status(200).json(match);
  } catch (error) {
    res.status(401).send({ message: errorMessage });
  }
};

const createMatch = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const matchInfo = req.body;

    if (matchInfo.awayTeamId === matchInfo.homeTeamId) {
      res.status(422).json({ message: equalTeamMessage });
    }

    const newMatch = await matchService.createMatch(token, matchInfo);
    res.status(201).json(newMatch);
  } catch (error) {
    res.status(404).send({ message: 'There is no team with such id!' });
  }
};

const productController = {
  getAllMatches,
  finishMatch,
  updateMatch,
  createMatch,
};

export default productController;
