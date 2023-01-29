import Joi from 'joi';
import { GroupDTO, PermissionNames } from '../types/group';

export const groupSchema = Joi.object<GroupDTO>({
    name: Joi.string().required(),
    permissions: Joi.array().items(
        Joi.string().valid(...Object.keys(PermissionNames))
    )
});
