import { v4 as uuid } from 'uuid';

import { GroupDal } from '../data-access';
import { GroupDTO } from '../types/group';

export class GroupService {
    private groupDal;

    constructor(groupDal: GroupDal) {
        this.groupDal = groupDal;
    }

    public async getGroupById(id: string) {
        const group = await this.groupDal.getById(id);
        return group.toJSON();
    }

    public async getAllGroups() {
        const groups = await this.groupDal.getAll();
        return groups.map(group => group.toJSON());
    }

    public async createGroup(groupData: GroupDTO) {
        const id = uuid();
        const newGroup = {
            ...groupData,
            id
        };

        return (await this.groupDal.create(newGroup)).toJSON();
    }

    public async updateGroupById(id: string, groupData: GroupDTO) {
        return this.groupDal.update(id, {
            ...groupData,
            id
        });
    }

    public async deleteGroupById(id: string) {
        return this.groupDal.delete(id);
    }

    public async addUsersToGroup(groupId: string, userIds: string[]) {
        return this.groupDal.addUsersToGroup(groupId, userIds);
    }
}

