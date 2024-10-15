import express, { Request, Response, NextFunction } from "express";
import { UserService, RegisterService, AuthService } from "./services";
import { UserRepository, LevelStorage } from "./storage";

const PORT = 3000;

const app = express();
let count = 0;

const storage = new LevelStorage("./db");
const userRepository = new UserRepository(storage);
const userService = new UserService(new RegisterService(userRepository), new AuthService(userRepository));

app.use(express.static("public"));
app.use(["/register", "/login"], express.urlencoded({ extended: true }));
app.use((req: Request, res: Response, next: NextFunction) => {
  count++;
  console.log(count);
  next();
});

app.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  await userService.register(username, password);
  res.status(200).send("Success");
});

app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  const authed = await userService.login(username, password);

  if (authed) {
    res.status(200).send("Success");
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await userRepository.getAllUsers();
  res.status(200).json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
