import { Request, Response } from 'express';
import loginService from '../services/loginService';

const loginController = {
  async login(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const response = await loginService.login(req.body);

      return res.status(200).json(response);
    } catch (error: any) {
      return error.status
        ? res.status(error.status).json({ message: error.message })
        : res.status(500).json({ message: error.message });
    }
  },

  async userRole(req: Request, res: Response): Promise<Response | undefined> {
    try {
      const token = req.headers.authorization;
      const role = await loginService.userRole(token as string);
      res.status(200).json({ role });
    } catch (error: any) {
      return error.status
        ? res.status(error.status).json({ message: error.message })
        : res.status(500).json({ message: error.message });
    }
  },

};

export default loginController;
