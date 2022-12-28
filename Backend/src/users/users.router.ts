import * as UserService from "./users.methods";
import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const usersRouter = express.Router();

//getUser -- ~()~/api/users/user?id=...
usersRouter.get("/user", async (req: Request, res: Response) => {
  const id = parseInt(req.query.id as string, 10);
  if (id) {
    try {
      const user = await UserService.getUser(id);
      if (user) {
        return res.status(200).json(user);
      }
      return res.status(404).json("User not found");
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
  return res.status(400).json("Bad request");
});

//deleteUser -- ~()~/api/users/user?id=...
usersRouter.delete("/user", async (req: Request, res: Response) => {
  const id = parseInt(req.query.id as string, 10);
  if (id) {
    try {
      await UserService.deleteUser(id);
      return res.status(200).json("User deleted");
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
  return res.status(400).json("Bad request");
});

//getAllUsers -- ~()~/api/users?allUsers=true
usersRouter.get("/", async (req: Request, res: Response) => {
  const query = req.query.allUsers;
  if (query) {
    try {
      const users = await UserService.getAllUsers();
      if (users) {
        return res.status(200).json(users);
      }
      return res.status(404).json("No users found");
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
  return res.status(400).json("Bad request");
});

//getUserFavoriteCocktails -- ~()~/api/users/user?email=...?cocktails=true

usersRouter.get("/user", async (req: Request, res: Response) => {
  const email = req.query.email as string;
  const query = req.query.cocktails;
  if (email && query) {
    try {
      const favorites = await UserService.getUserFavoriteCocktails(email);
      if (favorites) {
        return res.status(200).json(favorites);
      }
      return res.status(404).json("No favorites found");
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
  return res.status(400).json("Bad request");
});
