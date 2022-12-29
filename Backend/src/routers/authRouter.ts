import { User } from "@prisma/client";
import type { Request, Response } from "express";
import express from "express";
import {
  createUser,
  deleteUserRequestToken,
  getUser,
  getUserByEmail,
} from "../controllers/userController";
import { setUserRequestToken } from "../controllers/userController";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../controllers/authController";
import * as jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req);
  if (email && password) {
    try {
      const user = await getUserByEmail({ email });
      if (user) {
        const accessToken = generateAccessToken({ id: user.id });
        const refreshToken = generateRefreshToken(user);
        await setUserRequestToken(user.id, refreshToken);
        return res.status(200).json({
          jwt: accessToken,
          user: user,
        });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
  return res.status(400).json({ message: "Invalid user data" });
});

authRouter.post("/register", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const newUser = await createUser({ firstName, lastName, email, password });
    if (newUser) {
      const accessToken = generateAccessToken({ id: newUser.id });
      const refreshToken = generateRefreshToken(newUser);
      await setUserRequestToken(newUser.id, refreshToken);
      return res.status(200).json({
        jwt: accessToken,
        user: newUser,
      });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
  return res.status(400).json({ message: "Invalid user data" });
});

authRouter.post("/logout", async (req: Request, res: Response) => {
  const id = parseInt(req.body.id, 10);
  if (id) {
    const user = await getUser({ id });
    if (user) {
      if (user.requestToken) {
        await deleteUserRequestToken(id);
        return res.status(200).json({ message: "User logged out" });
      }
      return res.status(400).json({ message: "User not logged in" });
    }
  }
  return res.status(400).json({ message: "Invalid user id" });
});

//if access token is expired, use refresh token to generate new access token using jwt.verify

authRouter.post("/refresh_token", async (req: Request, res: Response) => {
  const id = parseInt(req.body.id, 10);
  const tokenFromClient = req.body.token as string;
  if (id) {
    const user = await getUser({ id });
    if (user) {
      const token = user.requestToken;
      if (token == tokenFromClient) {
        try {
          const decoded = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET as string,
          );
          const accessToken = generateAccessToken({ id: user.id });
          return res.status(200).json({
            jwt: accessToken,
          });
        } catch (error: any) {
          return res.status(400).json({ message: error.message });
        }
      }
    }
  }
  return res.status(400).json({ message: "Invalid user id" });
});
export default authRouter;
