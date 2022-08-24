import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import ValidateError from '../middleWares/ValidateError';

const secret = process.env.JWT_SECRET || '123456';

export const auth = (token: string) => {
  if (!token) throw new ValidateError(401, 'Token not found');
  const data = jwt.verify(token, secret) as jwt.JwtPayload;
  return data;
};

export const verifyToken = (password: string) => jwt.verify(password, secret);

export const setToken = (user: jwt.JwtPayload) => jwt.sign({ data: user }, secret);
