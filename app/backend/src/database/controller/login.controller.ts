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
    }
  } catch (error) {
    res.status(401).send({ message: `${error}` });
  }
};

const getRole = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const { authorization } = req.headers;
    const token = authorization as string;
    const role = await userService.getRole(token);
    res.status(200).json({ role });
  } catch (error) {
    res.status(401).send({ message: 'Token must be a valid token' });
  }
};

const loginController = {
  getUserByEmail,
  getRole,
};

export default loginController;
