import { User } from '../interfaces';
import { UserModel } from '../models';

export class UserDal {
    async create(user: User) {
        return UserModel.create(user);
    }

    async update(id: string, inputUser: User) {
        const user = await this.getById(id);
        return user.update(inputUser);
    }

    async getById(id: string) {
        const user = await UserModel.findByPk(id);
        if (!user) {
            throw `No user found with id=${id}`;
        }

        return user;
    }

    async getAll() {
        return UserModel.findAll();
    }
}
