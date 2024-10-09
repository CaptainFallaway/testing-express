"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(registerService, authService) {
        this.registerService = registerService;
        this.authService = authService;
    }
    register(username, password) {
        this.registerService.register(username, password);
    }
    login(username, password) {
        return this.authService.login(username, password);
    }
}
exports.UserService = UserService;
