import Joi from 'joi';
import { UserDTO } from '../types/user';

export const userSchema = Joi.object<UserDTO>({
    login: Joi.string().required(),
    password: Joi.string()
        .pattern(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)// contains letters and numbers
        .required().messages({
            'string.pattern.base': 'Password has to have letters and numbers'
        }),
    age: Joi.number().integer().min(4).max(130).required()
});
