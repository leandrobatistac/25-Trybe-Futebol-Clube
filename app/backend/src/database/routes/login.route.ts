import { Router } from 'express';
import loginController from '../controller/login.controller';
import loginValidate from '../middlewares/loginValidate';

const loginRoute = Router();

const loginMiddlewares = [
  loginValidate.checkBody,
  loginValidate.verifyEmail,
  loginValidate.verifyPassword,
];

loginRoute.post('/', loginMiddlewares, loginController.getUserByEmail);

export default loginRoute;
