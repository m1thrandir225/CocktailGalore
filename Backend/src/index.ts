import { userRouter } from "./routers/userRouter";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import authRouter from "./routers/authRouter";
import verifyToken from "./middleware/verifyToken";

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", authRouter);
app.use(verifyToken);
app.use("/users", userRouter);

const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  res.json({ message: "Welcome to the application" });
});
app.use("/", router);
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
