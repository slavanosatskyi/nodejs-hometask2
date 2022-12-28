import { v4 as uuid } from 'uuid';
import { User, UserData, UserId } from '../interfaces';

const users = new Map<UserId, User>();

export function getUserById(id: string) {
    return users.get(id);
}

export function createUser(userData: UserData) {
    const id = uuid();
    const newUser = {
        ...userData,
        id
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

export function getAutoSuggestUsers(loginSubstring: string, limit?: number) {
    const lowerCaseLoginSubstring = loginSubstring.toLowerCase();

    return Array.from(users.values())
        .filter((user) =>
            user.login.toLowerCase().includes(lowerCaseLoginSubstring)
        )
        .sort((a, b) => {
            if (a.login.toLowerCase() < b.login.toLowerCase()) {
                return -1;
            } else if (a.login.toLowerCase() > b.login.toLowerCase()) {
                return 1;
            }

            return 0;
        })
        .slice(0, limit);
}
