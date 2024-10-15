import { IRegisterService } from "./register";
import { IAuthService } from "./auth";

export interface IUserService {
    register(username: string, password: string): Promise<void>;
    login(username: string, password: string): Promise<boolean>;
}

export class UserService implements IUserService {
    constructor(private registerService: IRegisterService, private authService: IAuthService) {}

    async register(username: string, password: string): Promise<void> {
        await this.registerService.register(username, password);
    }

    async login(username: string, password: string): Promise<boolean> {
        return this.authService.login(username, password);
    }
}