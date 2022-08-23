import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import ValidateError from '../middleWares/ValidateError';

const secret = process.env.JWT_SECRET || '123456';

export const auth = async (token: string) => {
  if (!token) throw new ValidateError(401, 'Token not found');
  const { value } = jwt.verify(token, secret) as jwt.JwtPayload;
  delete value.password;
  return value;
  // throw new ValidateError(401, 'Expired or invalid token');
};

export const verifyToken = (password: string) => jwt.verify(password, secret);

export const getToken = (password: string) => jwt.sign({ data: password }, secret);
