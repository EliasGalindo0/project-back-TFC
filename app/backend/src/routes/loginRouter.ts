import { Router } from 'express';
import loginController from '../controllers/loginController';

const loginRouter = Router();

loginRouter.post('/', loginController.login);
loginRouter.get('/validate', loginController.authentication);

export default loginRouter;
