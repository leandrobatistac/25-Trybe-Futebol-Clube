import { Request, Response, NextFunction } from 'express';

const tokenValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  next();
};

export default tokenValidate;
