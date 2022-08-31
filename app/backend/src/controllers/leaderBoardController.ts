import { Request, Response } from 'express';
import leaderBoardService from '../services/leaderBoardService';

export default class leaderBoardController {
  static async get(_req: Request, res: Response) {
    const response = await leaderBoardService.get();
    return res.status(200).json(response);
  }

  static async getAway(_req: Request, res: Response) {
    const response = await leaderBoardService.getAway();
    return res.status(200).json(response);
  }
}
