import path from "path";
import { userRouter } from "./routers/userRouter";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import type { Request, Response } from "express";
import cors from "cors";
import authRouter from "./routers/authRouter";
import verifyToken from "./middleware/verifyToken";
import flavourRouter from "./routers/flavourRouter";
import cocktailRouter from "./routers/cocktailRouter";
import insightRouter from "./routers/insightRouter";

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/", authRouter);
app.use(verifyToken);
app.use("/users", userRouter);
app.use("/flavours", flavourRouter);
app.use("/cocktails", cocktailRouter);
app.use("/insights", insightRouter);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
