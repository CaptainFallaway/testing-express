import { IUserRepository } from "../storage";

export interface IRegisterService {
    register(username: string, password: string): void;
}

export class RegisterService implements IRegisterService {
    constructor(private userRepository: IUserRepository) {}

    register(username: string, password: string): void {
        this.userRepository.addUser({ username, password });
    }
}