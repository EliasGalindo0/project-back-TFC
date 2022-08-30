import * as jwt from 'jsonwebtoken';
import ValidateError from './ValidateError';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || '123456';

export const auth = (token: string) => {
  if (!token) throw new ValidateError(401, 'Token not found');
  try {
    const data = jwt.verify(token, secret) as jwt.JwtPayload;
    return data;
  } catch (error) {
    throw new ValidateError(401, 'Token must be a valid token');
  }
};

export const verifyToken = (password: string) => jwt.verify(password, secret);

export const setToken = (payload: jwt.JwtPayload) => jwt.sign({ data: payload }, secret);
