import { Router } from 'express';
import teamController from '../controllers/teamController';

const teamRouter = Router();

teamRouter.get('/:id', teamController.getById);
teamRouter.get('/', teamController.getTeams);

export default teamRouter;
