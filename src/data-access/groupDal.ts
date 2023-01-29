import { Transaction } from 'sequelize';
import { getSequelize } from '../db';
import { GroupModel } from '../models';
import { Group } from '../types/group';
import { UserDal } from './userDal';

export class GroupDal {
    public async create(group: Group) {
        return GroupModel.create(group);
    }

    public async update(id: string, inputGroup: Group) {
        const group = await this.getById(id);
        return group.update(inputGroup);
    }

    public async getById(id: string, transaction?: Transaction) {
        const group = await GroupModel.findByPk(id, { transaction });
        if (!group) {
            throw `No group found with id=${id}`;
        }

        return group;
    }

    public async delete(id: string) {
        const group = await this.getById(id);
        return group.destroy();
    }

    public async getAll() {
        return GroupModel.findAll();
    }

    public async addUsersToGroup(groupId: string, userIds: string[]) {
        const userDal = new UserDal();
        try {
            const result = await getSequelize().transaction(async (t) => {
                const group = await this.getById(groupId, t);
                const users = await Promise.all(
                    userIds.map((id) => userDal.getById(id, t))
                );
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await group.addUsers(users);

                return `${users.length} where added to the group ${groupId}`;
            });
            return result;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}
