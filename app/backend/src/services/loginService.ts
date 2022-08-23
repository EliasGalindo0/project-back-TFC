import Joi = require('joi');
import * as bcrypt from 'bcryptjs';
import usersModel from '../database/models/users';
import ValidateError from '../middleWares/ValidateError';
import { getToken } from './authenticationService';

const schema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
}).messages({
  'string.empty': 'All fields must be filled',
  'any.required': 'All fields must be filled',
});

const loginService = {
  async login(email: string, password: string) {
    // if (!email || !password) throw new ValidateError(401, 'Incorrect email or password');

    const { error } = schema.validate({ email, password });
    if (error) throw new ValidateError(400, error.message);

    const user = await usersModel.findOne({
      where: { email },
    });
    console.log(user);

    if (!user) throw new ValidateError(401, 'Incorrect email or password');

    const verified = await bcrypt.compare(password, user.password);

    if (!verified) throw new ValidateError(401, 'Incorrect email or password');

    const token = getToken(password);

    return { token };
  },
};

export default loginService;
