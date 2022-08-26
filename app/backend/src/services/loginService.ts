import Joi = require('joi');
import * as bcrypt from 'bcryptjs';
import usersModel from '../database/models/users';
import ValidateError from '../middleWares/ValidateError';
import { auth, setToken } from './authenticationService';

const schema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
}).messages({
  'string.empty': 'All fields must be filled',
  'any.required': 'All fields must be filled',
});

const loginService = {
  async login(email: string, password: string) {
    const { error } = schema.validate({ email, password });
    if (error) throw new ValidateError(400, error.message);

    const dataValues = await usersModel.findOne({
      where: { email },
    });

    if (!dataValues) throw new ValidateError(401, 'Incorrect email or password');

    const { id, username, role } = dataValues;

    const verified = await bcrypt.compare(password, dataValues.password);

    if (!verified) throw new ValidateError(401, 'Incorrect email or password');

    const token = setToken({ id, username, role, email });

    return { token };
  },

  async userRole(token: string): Promise<string> {
    if (!token) throw new ValidateError(401, 'Token not found');
    const tokenVerify = auth(token);
    return tokenVerify.data.role;
  },
};

export default loginService;
