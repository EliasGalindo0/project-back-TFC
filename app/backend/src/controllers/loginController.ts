import { Request, Response } from 'express';
// import { auth } from '../services/authenticationService';
import loginService from '../services/loginService';

const loginController = {
  async login(req: Request, res: Response): Promise<Response | unknown> {
    try {
      const { email, password } = req.body;
      console.log(req.body);

      // const xablau = await auth(email, password, req.headers);
      const response = await loginService.login(email, password);

      return res.status(200).json(response);
    } catch (error: any) {
      return error.status
        ? res.status(error.status).json({ message: error.message })
        : res.status(500).json({ message: error.message });
    }
  },

};

export default loginController;
