import level from "level-ts";
import { User } from "./types";

export interface ILevelStorage {
    addUser(user: User): Promise<void>;
    getUser(username: string): Promise<User | null>;
    getAllUsers(): Promise<User[]>;
}

export class LevelStorage implements ILevelStorage {
    private db: level<User>;

    constructor(dbPath: string) {
        this.db = new level(dbPath);
    }

    async addUser(user: User): Promise<void> {
        await this.db.put(user.username, user);
    }

    async getUser(username: string): Promise<User | null> {
        try {
            return await this.db.get(username);
        } catch (error) {
            if ((error as any).notFound) {
                return null;
            }
            throw error; // Re-throw other errors
        }
    }

    async getAllUsers(): Promise<User[]> {
        return this.db.all();
    }
}
