import { Request, Response } from 'express';
import leaderBoardService from '../services/leaderBoardService';

export default class leaderBoardController {
  static async getHome(_req: Request, res: Response) {
    const response = await leaderBoardService.getHome();
    return res.status(200).json(response);
  }

  static async getAway(_req: Request, res: Response) {
    const response = await leaderBoardService.getAway();
    return res.status(200).json(response);
  }

  static async getGeneral(_req: Request, res: Response) {
    const response = await leaderBoardService.getGeneral();
    return res.status(200).json(response);
  }
}
