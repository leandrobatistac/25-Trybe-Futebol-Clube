import { sign, verify, SignOptions } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET as string;

const jwtConfig: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generate = (id: number, email: string) => {
  const object = { id, email };
  const token = sign(object, secretKey, jwtConfig);
  return token;
};

const validate = (token: string) => {
  const isValid = verify(token, secretKey);
  return isValid;
};

const tokens = {
  generate,
  validate,
};

export default tokens;
