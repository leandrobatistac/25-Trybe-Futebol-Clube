import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import tokens from '../utils/token';

const tokenValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const validate = tokens.validate(authorization) as JwtPayload;
  if (validate.message) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
};

export default tokenValidate;
