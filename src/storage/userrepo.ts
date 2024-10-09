import { User } from "./types";

export interface IUserRepository {
    addUser(user: User): void;
    getUser(username: string): User | null;
}

export class UserRepository implements UserRepository {
    addUser(user: User) {
        localStorage.setItem(user.username, JSON.stringify(user));
    }
    
    getUser(username: string): User | null {
        const user = localStorage.getItem(username);
        return user ? JSON.parse(user) : null;
    }
}