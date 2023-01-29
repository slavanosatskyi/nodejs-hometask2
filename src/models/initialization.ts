import { DataTypes } from 'sequelize';
import { getSequelize } from '../db';
import { GroupModel } from './groups';
import { UserModel } from './users';

export function initModels() {
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
            sequelize: getSequelize(),
            modelName: 'User',
            timestamps: false,
            createdAt: false,
            updatedAt: false
        }
    );

    GroupModel.init(
        {
            id: {
                type: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING
            },
            permissions: {
                type: DataTypes.ARRAY(DataTypes.STRING)
            }
        },
        {
            sequelize: getSequelize(),
            modelName: 'Group',
            timestamps: false,
            createdAt: false,
            updatedAt: false
        }
    );

    UserModel.belongsToMany(GroupModel, { through: 'UserGroup' });
    GroupModel.belongsToMany(UserModel, { through: 'UserGroup' });
}
