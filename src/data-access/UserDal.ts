import { User } from '../types/user';
import { UserModel } from '../models';
import { Transaction } from 'sequelize';

export class UserDal {
    async create(user: User) {
        return UserModel.create(user);
    }

    async update(id: string, inputUser: User) {
        const user = await this.getById(id);
        return user.update(inputUser);
    }

    async getById(id: string, transaction?: Transaction) {
        const user = await UserModel.findByPk(id, { transaction });
        if (!user) {
            throw `No user found with id=${id}`;
        }

        return user;
    }

    async getByLogin(login: string) {
        const user = await UserModel.findOne({ where: { login } });
        return user;
    }

    async getAll() {
        return UserModel.findAll();
    }
}
