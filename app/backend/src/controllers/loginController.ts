import { Request, Response } from 'express';
import { auth } from '../services/authenticationService';
// import { auth } from '../services/authenticationService';
import loginService from '../services/loginService';

const loginController = {
  async login(req: Request, res: Response): Promise<Response | unknown> {
    try {
      const { email, password } = req.body;
      console.log(req.body);

      const response = await loginService.login(email, password);

      return res.status(200).json(response);
    } catch (error: any) {
      return error.status
        ? res.status(error.status).json({ message: error.message })
        : res.status(500).json({ message: error.message });
    }
  },

  async authentication(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;
      const { role } = await auth(token as string);
      res.status(200).json({ role });
    } catch (error: any) {
      return error.status
        ? res.status(error.status).json({ message: error.message })
        : res.status(500).json({ message: error.message });
    }
  },

};

export default loginController;
