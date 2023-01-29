import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';

import { Permission } from '../types/group';

export class GroupModel extends Model<
InferAttributes<GroupModel>,
  InferCreationAttributes<GroupModel>
> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare permissions: Array<Permission>;
}
