import { Request, Response } from 'express';

export interface IError{
  message: string
  status: number
}

const ErrorMiddleware = (error: IError, _req: Request, res: Response) =>
  res.status(error.status).json({ message: error.message });

export default ErrorMiddleware;
