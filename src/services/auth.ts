import { IUserRepository } from "../storage";

export interface IAuthService {
    login(username: string, password: string): Promise<boolean>;
}

export class AuthService implements IAuthService {
    constructor(private userRepository: IUserRepository) {}

    async login(username: string, password: string): Promise<boolean> {
        const user = await this.userRepository.getUser(username);
        if (!user) return false;
        return user.password === password;
    }
}