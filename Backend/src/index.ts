import { flavourRouter } from "./flavour/flavour.router";
import { authorRouter } from "./author/author.router";
import { insightsRouter } from "./insights/insights.router";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { usersRouter } from "./users/users.router";
import { cocktailsRouter } from "./cocktails/cocktails.router";
import { authRouter } from "./auth/auth.router";
dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users/", usersRouter); //users router
app.use("/api/cocktails/", cocktailsRouter); //cocktails router
app.use("/api/insights/", insightsRouter); //insights router
app.use("/api/authors/", authorRouter); //authors router
app.use("/api/flavours/", flavourRouter); //flavours router
app.use("/", authRouter); //authorization router

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

