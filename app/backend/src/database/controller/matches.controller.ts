import { Request, Response, NextFunction } from 'express';
import matchService from '../services/matches.service';

const getAllMatches = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const allMatches = await matchService.getAllMatches();
    res.status(200).json(allMatches);
  } catch (error) {
    next(error);
  }
};

const productController = {
  getAllMatches,
};

export default productController;