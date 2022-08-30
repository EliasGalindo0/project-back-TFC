import { Router } from 'express';
import leaderBoardController from '../controllers/leaderBoardController';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', leaderBoardController.get);

export default leaderBoardRouter;
