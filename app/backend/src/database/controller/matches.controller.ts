import { Request, Response, NextFunction } from 'express';
import matchService from '../services/matches.service';

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
    res.status(401).send({ message: 'Token must be a valid token' });
  }
};

const productController = {
  getAllMatches,
  finishMatch,
};

export default productController;
