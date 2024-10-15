import { IUserRepository } from "../storage";

export interface IRegisterService {
    register(username: string, password: string): Promise<void>;
}

export class RegisterService implements IRegisterService {
    constructor(private userRepository: IUserRepository) {}

    async register(username: string, password: string): Promise<void> {
        await this.userRepository.addUser({ username, password });
    }
}