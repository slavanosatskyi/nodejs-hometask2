import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize
} from 'sequelize';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URI: string;
    }
  }
}

const sequelize = new Sequelize(process.env.DATABASE_URI, {
    dialect: 'postgres'
});

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

UserModel.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true
        },
        login: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: false,
        createdAt: false,
        updatedAt: false
    }
);

