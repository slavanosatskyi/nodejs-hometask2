import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';

export class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
    declare id: CreationOptional<string>;
    declare isDeleted: CreationOptional<boolean>;
    declare login: string;
    declare password: string;
    declare age: number;
}

