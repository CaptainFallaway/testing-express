"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
class UserRepository {
    addUser(user) {
        localStorage.setItem(user.username, JSON.stringify(user));
    }
    getUser(username) {
        const user = localStorage.getItem(username);
        return user ? JSON.parse(user) : null;
    }
}
exports.UserRepository = UserRepository;
