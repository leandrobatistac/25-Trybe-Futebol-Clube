import { Request, Response, NextFunction } from 'express';
import userService from '../services/users.service';
import tokens from '../utils/token';

const getUserByEmail = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { email } = req.body;
    const user = await userService.getUserByName(email);
    if (user !== null) {
      const token = tokens.generate(user.id, user.email);
      res.status(200).json({ token });
    }
  } catch (error) {
    next(error);
  }
};

const loginController = {
  getUserByEmail,
};

export default loginController;
