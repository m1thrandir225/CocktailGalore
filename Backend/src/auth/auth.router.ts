import * as jwt from "jsonwebtoken";
import express from "express";
import type { Request, Response, NextFunction } from "express";
import * as AuthService from "./auth.methods";
export const authRouter = express.Router();

//login
authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (email && password) {
    try {
      const user = await AuthService.getUserByEmail(email);
      if (user) {
        const accessToken = AuthService.generateAccessToken(user);
        const refreshToken = AuthService.generateRefreshToken(user);
        return res.status(200).json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: user,
        });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
});
//register
authRouter.post("/register", async (req: Request, res: Response) => {
  const { email, firstName, lastName, password } = req.body;
  console.log(req.body);
  if (email && firstName && lastName && password) {
    try {
      const newUser = await AuthService.createUser(
        email,
        firstName,
        lastName,
        password,
      );
      if (newUser) {
        const accessToken = AuthService.generateAccessToken(newUser);
        const refreshToken = AuthService.generateRefreshToken(newUser);
        return res.status(200).json({ accessToken, refreshToken, newUser });
      }

      return res.status(400).json({ message: "Registration failed" });
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
  return res.status(400).json({ message: "Registration failed" });
});

//prakjas refresh token i proveruvas dali e validen ako e validen vrakjas nov access token, verifikacijata za dali e expirenat access tokenot e na klientot
authRouter.post("/refresh_token", async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  const email = req.body.email;
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as string,
    (err: any, data: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      const accessToken = AuthService.generateAccessToken(data);
      return res.status(200).json({ accessToken: accessToken });
    },
  );
});
