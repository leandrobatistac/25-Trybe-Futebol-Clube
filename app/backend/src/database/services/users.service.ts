import { JwtPayload } from 'jsonwebtoken';
import userModel from '../models/users.model';
import tokens from '../utils/token';

const getUserByEmail = async (email:string) => {
  const user = userModel.findOne({
    attributes: ['id', 'email', 'password', 'role'],
    where: { email },
  });

  return user;
};

const getRole = async (token:string): Promise<string | undefined> => {
  const decodedToken = tokens.validate(token) as JwtPayload;
  const { email } = decodedToken;
  const user = await getUserByEmail(email);

  if (user !== null) {
    return user.role;
  }
};

const userService = {
  getUserByEmail,
  getRole,
};

export default userService;
