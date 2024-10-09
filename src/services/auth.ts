import { IUserRepository } from "../storage";

export interface IAuthService {
    login(username: string, password: string): boolean;
}

export class AuthService implements IAuthService {
    constructor(private userRepository: IUserRepository) {}

    login(username: string, password: string): boolean {
        const user = this.userRepository.getUser(username);
        if (!user) return false;
        return user.password === password;
    }
}