import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  verifyPassword,
} from "../utils/authService";
import { db } from "../utils/db.server";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const { adminPanel } = req.query;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found, invalid email" });
  }
  const passwordMatch = await verifyPassword(password, user.password);
  if (!passwordMatch) {
    return res.status(404).json({ message: "Invalid password" });
  }
  if (adminPanel == "true") {
    if (user.userType !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this page" });
    }
    const accessToken = await generateAccessToken({ email: user.email });
    const loggedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        requestToken: accessToken,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        profileImage: true,
        likedFlavours: true,
        favouriteCocktails: true,
        readInsights: true,
        userType: true,
      },
    });
    return res.status(200).json({
      accessToken,
      user: loggedUser,
    });
  }

  const accessToken = await generateAccessToken({ email: user.email });
  const refreshToken = await generateRefreshToken({ email: user.email });
  const loggedUser = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      requestToken: refreshToken,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      profileImage: true,
      likedFlavours: true,
      favouriteCocktails: true,
      readInsights: true,
    },
  });
  res.status(200).json({
    accessToken,
    refreshToken,
    user: loggedUser,
  });
}

export async function logout(req: Request, res: Response) {
  const { id } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  console.log(req.body);
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return res
      .status(404)
      .json({ message: "The user you are trying to logout, is not found." });
  }
  const loggedOutUser = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      requestToken: null,
    },
  });
  return res.status(200).json({ message: "User logged out" });
}

export async function register(req: Request, res: Response) {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const newUser = await db.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: hashedPassword,
    },
  });
  if (!newUser) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  const accessToken = await generateAccessToken({ email: newUser.email });
  const refreshToken = await generateRefreshToken({ email: newUser.email });
  const loggedUser = await db.user.update({
    where: {
      id: newUser.id,
    },
    data: {
      requestToken: refreshToken,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      profileImage: true,
      favouriteCocktails: true,
      likedFlavours: true,
      readInsights: true,
    },
  });
  if (!loggedUser) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json({
    accessToken,
    refreshToken,
    user: loggedUser,
  });
}

export async function refreshToken(req: Request, res: Response) {
  const { id, refreshToken } = req.body;
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (refreshToken != user.requestToken) {
    return res.status(400).json({ message: "Invalid refresh token" });
  }
  const accessToken = await generateAccessToken({ email: user.email });
  return res.status(200).json({ accessToken });
}
