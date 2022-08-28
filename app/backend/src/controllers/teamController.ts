import { Request, Response } from 'express';
import teamService from '../services/teamService';

export default class teamController {
  static async getTeams(_req: Request, res: Response) {
    const teams = await teamService.getTeams();
    return res.status(200).json(teams);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await teamService.getById(Number(id));
    return res.status(200).json(team);
  }
}
