import { userRouter } from "./routers/userRouter";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import type { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import authRouter from "./routers/authRouter";
import verifyToken from "./middleware/verifyToken";
import { flavourRouter } from "./routers/flavourRouter";

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("../public"));
app.use("/", authRouter);
//app.use(verifyToken);
app.use("/users", userRouter);
app.use("/flavours", flavourRouter);

const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  res.json({ message: "Welcome to the application" });
});
app.use("/", router);
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
