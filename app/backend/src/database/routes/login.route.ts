import { Router } from 'express';
import loginController from '../controller/login.controller';
import loginValidate from '../middlewares/loginValidate';
import tokenValidate from '../middlewares/tokenValidate';

const loginRoute = Router();

const loginMiddlewares = [
  loginValidate.checkBody,
  loginValidate.verifyEmail,
  loginValidate.verifyPassword,
];

loginRoute.post('/', loginMiddlewares, loginController.getUserByEmail);
loginRoute.get('/role', tokenValidate, loginController.getRole);

export default loginRoute;
