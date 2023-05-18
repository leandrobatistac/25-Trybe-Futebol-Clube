import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcryptjs';
import userService from '../services/users.service';

const checkBody = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  next();
};

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;

  const user = await userService.getUserByEmail(email);

  if (!regex.test(email) || !user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

const verifyPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);

  if (user !== null) {
    const codePassword = await compare(password, user.password);

    if (password.length < 6 || !codePassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  }

  next();
};

const loginValidate = {
  checkBody,
  verifyEmail,
  verifyPassword,
};

export default loginValidate;
