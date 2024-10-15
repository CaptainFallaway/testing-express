import { User } from "./types";
import { ILevelStorage } from "./database";

export interface IUserRepository {
    addUser(user: User): Promise<void>;
    getUser(username: string): Promise<User | null>;
}

export class UserRepository implements IUserRepository {
    private storage: ILevelStorage;

    constructor(storage: ILevelStorage) {
        this.storage = storage;
    }

    async addUser(user: User): Promise<void> {
        await this.storage.addUser(user);
    }
    
    async getUser(username: string): Promise<User | null> {
        return this.storage.getUser(username);
    }

    async getAllUsers(): Promise<User[]> {
        return this.storage.getAllUsers();
    }
}