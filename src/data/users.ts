import { v4 as uuid } from 'uuid';
import { User, UserData, UserId } from '../interfaces';

const users = new Map<UserId, User>();

export function getAllUsers() {
    return Array.from(users.values());
}

export function getUserById(id: string) {
    return users.get(id);
}

export function createUser(userData: UserData) {
    const id = uuid();
    const newUser = {
        ...userData,
        id,
        isDeleted: false
    };
    users.set(id, newUser);
    return newUser;
}

export function updateUserById(id: string, userData: UserData) {
    const updatedUser = {
        ...userData,
        id
    };
    users.set(id, updatedUser);
    return updatedUser;
}

export function deleteUserById(id: string) {
    const deletedUser = users.get(id);
    if (deletedUser) {
        deletedUser.isDeleted = true;
    }
    return deletedUser;
}

export function getAutoSuggestUsers(loginSubstring: string, limit: number | undefined) {
    const lowerCaseLoginSubstring = loginSubstring.toLowerCase();

    return Array.from(users.values())
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
        .slice(0, limit);
}
