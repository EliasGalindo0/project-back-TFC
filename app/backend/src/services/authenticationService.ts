import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || '123456';

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<Request |
Response | NextFunction | undefined | void> => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    jwt.verify(authorization, secret);
    return next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export const verifyToken = (password: string) => jwt.verify(password, secret);

export const getToken = (password: string) => jwt.sign({ data: password }, secret);
