import { Request, Response } from 'express';
import userService from '../services/users.service';
import tokens from '../utils/token';

const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await userService.getUserByEmail(email);
    if (user !== null) {
      const token = tokens.generate(user.id, user.email);
      res.status(200).json({ token });
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(401).send({ message: `${error}` });
  }
};

const loginController = {
  getUserByEmail,
};

export default loginController;
