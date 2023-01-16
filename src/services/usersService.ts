import { v4 as uuid } from 'uuid';
import { UserDal } from '../data-access';
import { User, UserDTO } from '../interfaces';

export default class UserService {
    private userDal;

    constructor(userDal: UserDal) {
        this.userDal = userDal;
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userDal.getById(id);
        return user.toJSON();
    }

    public async createUser(userData: UserDTO) {
        const isLoginUnique = await this.isLoginUnique(userData.login);
        if (!isLoginUnique) {
            throw notUniqueLoginMessage(userData.login);
        }

        const id = uuid();
        const newUser = {
            ...userData,
            id,
            isDeleted: false
        };

        return (await this.userDal.create(newUser)).toJSON();
    }

    async updateUserById(id: string, userData: UserDTO) {
        const currentUser = await this.getUserById(id);
        const isLoginUnique = await this.isLoginUnique(userData.login);

        if (currentUser.login !== userData.login && !isLoginUnique) {
            throw notUniqueLoginMessage(userData.login);
        }

        return this.userDal.update(id, {
            ...userData,
            id,
            isDeleted: currentUser.isDeleted
        });
    }

    async deleteUserById(id: string) {
        const currentUser = await this.getUserById(id);
        return this.userDal.update(id, {
            ...currentUser,
            id,
            isDeleted: true
        });
    }

    async getAutoSuggestUsers(loginSubstring: string, limit?: number) {
        const lowerCaseLoginSubstring = loginSubstring.toLowerCase();
        const users = await this.userDal.getAll();

        return users
            .filter((user) =>
                user.login.toLowerCase().includes(lowerCaseLoginSubstring)
            )
            .sort((currentUser, nextUser) => {
                const loginA = currentUser.login.toLowerCase();
                const loginB = nextUser.login.toLowerCase();
                if (loginA < loginB) {
                    return -1;
                } else if (loginA > loginB) {
                    return 1;
                }

                return 0;
            })
            .slice(0, limit)
            .map((user) => user.toJSON());
    }

    private async isLoginUnique(login: string) {
        const users = await this.userDal.getAll();
        return !users.some((user) => user.login === login);
    }
}

const notUniqueLoginMessage = (login: string) =>
    `Such user already exists ${login}`;
