import * as UserService from "./users.methods";
import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const usersRouter = express.Router();

//getUser
usersRouter.get("/user/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const user = await UserService.getUser(id);
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json("User not found");
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

//getAllUsers
usersRouter.get("/all", async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    if (users) {
      return res.status(200).json(users);
    }
    return res.status(404).json("No users found");
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

//deleteUser
usersRouter.delete("/user/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    await UserService.deleteUser(id);
    return res.status(200).json("User deleted");
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

//getUserFavoriteCocktails
usersRouter.get(
  "/user/:email/favorites",
  async (req: Request, res: Response) => {
    const email = req.params.email;
    try {
      const favorites = await UserService.getUserFavoriteCocktails(email);
      if (favorites) {
        return res.status(200).json(favorites);
      }
      return res.status(404).json("No favorites found");
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  },
);
