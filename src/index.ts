import express, { Request, Response } from "express";
import { UserService, RegisterService, AuthService } from "./services";
import { UserRepository } from "./storage";

const app = express();
const userRepository = new UserRepository();
const userService = new UserService(new RegisterService(userRepository), new AuthService(userRepository));
const PORT = 3000;

app.use(express.static("public"));
app.use(["/register", "/login"], express.urlencoded({ extended: true }));

app.post("/register", (req: Request, res: Response) => {
  const { username, password } = req.body;
  userService.register(username, password);
});

app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  const authed = userService.login(username, password);

  if (authed) {
    res.status(200).send("Success");
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
