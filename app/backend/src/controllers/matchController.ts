import { Request, Response } from 'express';
import matchService from '../services/matchService';

export default class matchController {
  static async get(_req: Request, res: Response) {
    const matches = await matchService.get();
    return res.status(200).json(matches);
  }
}
