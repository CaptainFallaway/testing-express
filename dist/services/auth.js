"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    login(username, password) {
        const user = this.userRepository.getUser(username);
        if (!user)
            return false;
        return user.password === password;
    }
}
exports.AuthService = AuthService;
