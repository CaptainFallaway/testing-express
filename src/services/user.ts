import { IRegisterService } from "./register";
import { IAuthService } from "./auth";

export interface IUserService {
    register(username: string, password: string): void;
    login(username: string, password: string): boolean;
}

export class UserService implements IUserService {
    constructor(private registerService: IRegisterService, private authService: IAuthService) {}

    register(username: string, password: string): void {
        this.registerService.register(username, password);
    }

    login(username: string, password: string): boolean {
        return this.authService.login(username, password);
    }
}