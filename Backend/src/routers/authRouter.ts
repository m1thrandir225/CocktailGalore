import express from "express";
import { body } from "express-validator";
import * as AuthController from "../controllers/authController";

const authRouter = express.Router();

authRouter.post(
  "/login",
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Email is invalid")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .notEmpty()
    .withMessage("Password is required"),
  AuthController.login,
);

authRouter.post(
  "/logout",
  body("id").notEmpty().isNumeric(),
  AuthController.logout,
);

authRouter.post(
  "/register",
  body(["firstName", "lastName", "email", "password"]).notEmpty(),
  body("email").isEmail().notEmpty().normalizeEmail(),
  body("password").isLength({ min: 5 }).notEmpty(),
  AuthController.register,
);

authRouter.post(
  "/refresh_token",
  body("id").notEmpty().isNumeric(),
  body("refreshToken").notEmpty(),
  AuthController.refreshToken,
);
export default authRouter;
