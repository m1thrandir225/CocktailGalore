import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const usersRouter = express.Router();

usersRouter.get("/", async (req: Request, res: Response) => {
  res.send("Hello World!");
});
