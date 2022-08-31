import { Router } from 'express';
import leaderBoardController from '../controllers/leaderBoardController';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/', leaderBoardController.getGeneral);
leaderBoardRouter.get('/home', leaderBoardController.getHome);
leaderBoardRouter.get('/away', leaderBoardController.getAway);

export default leaderBoardRouter;
