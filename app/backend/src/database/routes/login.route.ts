import { Router } from 'express';
import loginController from '../controller/login.controller';
import loginValidate from '../middlewares/loginValidate';

const loginRoute = Router();

loginRoute.post('/', loginValidate.checkBody, loginController.getUserByEmail);

export default loginRoute;
