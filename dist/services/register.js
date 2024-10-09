"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterService = void 0;
class RegisterService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    register(username, password) {
        this.userRepository.addUser({ username, password });
    }
}
exports.RegisterService = RegisterService;
