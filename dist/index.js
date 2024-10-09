"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const services_1 = require("./services");
const storage_1 = require("./storage");
const app = (0, express_1.default)();
const userRepository = new storage_1.UserRepository();
const userService = new services_1.UserService(new services_1.RegisterService(userRepository), new services_1.AuthService(userRepository));
const PORT = 3000;
app.use(express_1.default.static("public"));
app.use(["/register", "/login"], express_1.default.urlencoded({ extended: true }));
app.post("/register", (req, res) => {
    const { username, password } = req.body;
    userService.register(username, password);
});
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    userService.login(username, password);
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
