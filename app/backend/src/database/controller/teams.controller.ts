import { Request, Response, NextFunction } from 'express';
import teamService from '../services/teams.service';

const getAllTeams = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const allTeams = await teamService.getAllTeams();
    res.status(200).json(allTeams);
  } catch (error) {
    next(error);
  }
};

const productController = {
  getAllTeams,
};

export default productController;
