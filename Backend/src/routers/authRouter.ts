import * as AuthController from "../controllers/authController";
import type { Request, Response } from "express";
import express from "express";
import * as UserController from "../controllers/userController";
import { setUserRequestToken } from "../controllers/userController";
import { body, validationResult } from "express-validator";

const authRouter = express.Router();

authRouter.post(
  "/login",
  body("email").isEmail().normalizeEmail().notEmpty(),
  body("password").isLength({ min: 5 }).notEmpty(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //if there are validation errors return them
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await UserController.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found, invalid email" });
    }
    const passwordMatch = await AuthController.verifyPassword(
      password,
      user.password,
    );
    if (passwordMatch) {
      const accessToken = AuthController.generateAccessToken({
        email: user.email,
      });
      const refreshToken = AuthController.generateRefreshToken({
        email: user.email,
      });
      setUserRequestToken(user.id, refreshToken);
      res.json({
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          profileImage: user.profileImage,
          likedFlavours: user.likedFlavours,
          favouriteCocktails: user.favouriteCocktails,
          readInsights: user.readInsights,
        },
      });
    } else {
      return res.status(404).json({ message: "Invalid password" });
    }
  },
);

authRouter.post(
  "/logout",
  body("id").notEmpty().isNumeric(),
  async (req: Request, res: Response) => {
    //users has to have an access token to logout as well as their id in the body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.body;

    const user = await UserController.getUser(id);
    if (user) {
      UserController.deleteUserRequestToken(user.id);
      res.json({ message: "User logged out" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  },
);

authRouter.post(
  "/register",
  body(["firstName", "lastName", "email", "password"]).notEmpty(),
  body("email").isEmail().notEmpty().normalizeEmail(),
  body("password").isLength({ min: 5 }).notEmpty(),
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const hashedPassword = await AuthController.hashPassword(password);
    const newUser = await UserController.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    if (!newUser) {
      return res.status(500).json({ message: "User already exists" });
    }
    try {
      const accessToken = AuthController.generateAccessToken({
        email: newUser.email,
      });
      const refreshToken = AuthController.generateRefreshToken({
        email: newUser.email,
      });
      await setUserRequestToken(newUser.id, refreshToken);
      res.status(200).json({
        accessToken,
        refreshToken,
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          profileImage: newUser.profileImage,
          likedFlavours: [],
          favouriteCocktails: [],
          readInsights: [],
        },
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
);

authRouter.post(
  "/refresh_token",
  body("id").notEmpty().isNumeric(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, refreshToken } = req.body;
    const user = await UserController.getUser(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (refreshToken == user.requestToken && refreshToken != null) {
      const accessToken = AuthController.generateAccessToken({
        email: user.email,
      });
      res.status(200).json({ accessToken });
    } else {
      return res
        .status(403)
        .json({ message: "Invalid refresh token, please login again!" });
    }
  },
);
export default authRouter;
