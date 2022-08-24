import { Router } from 'express';
import loginController from '../controllers/loginController';

const loginRouter = Router();

loginRouter.get('/validate', loginController.userRole);
loginRouter.post('/', loginController.login);

export default loginRouter;
