import { Request, Response } from 'express';
import matchService from '../services/matchService';

export default class matchController {
  static async get(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      if (inProgress) {
        const progress = inProgress === 'true';
        const matches = await matchService.getByProgress(progress);
        return res.status(200).json(matches);
      }
      const matches = await matchService.get();
      return res.status(200).json(matches);
    } catch (error: any) {
      return error.status
        ? res.status(error.status).json({ message: error.message })
        : res.status(500).json({ message: error.message });
    }
  }

  static async add(req: Request, res: Response) {
    try {
      const response = await matchService.add(req.body, req.headers.authorization as string);

      res.status(201).json(response);
    } catch (error: any) {
      return error.status
        ? res.status(error.status).json({ message: error.message })
        : res.status(500).json({ message: error.message });
    }
  }

  static async finish(req: Request, res: Response) {
    await matchService.finish(Number(req.params.id));
    res.json({ message: 'Finished' });
  }

  static async update(req: Request, res: Response) {
    await matchService.update(Number(req.params.id), req.body);
    res.json({ message: 'Updated' });
  }
}
