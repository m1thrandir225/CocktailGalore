import { UserType } from ".prisma/client";
import * as UserService from "./users.methods";
import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const usersRouter = express.Router();

//getUser -- ~()~/api/users/user?id=...
//getUserFavoriteCocktails -- ~()~/api/users/user?email=...&cocktails=true
//updateUserInfo -- ~()~/appi/users/user?email=...&firstName=...&lastName=...&password=...
//addCocktailToFavorite -- ~()~/api/users/user?email=...&cocktailId=...
//addInsightToRead -- ~()~/api/users/user?email=...&insightId=...
//getLikedFlavours -- ~()~/api/users/user?email=...&allLikedFlavours=true
//addLikedFlavour -- ~()~/api/users/user?email=...&likedFlavours=[...]

usersRouter.get("/user", async (req: Request, res: Response) => {
  const id = parseInt(req.query.id as string, 10);
  const email = req.query.email as string;
  if (id) {
    const userType = req.query.userType as string;
    if (userType) {
      const type = userType.toUpperCase();
      try {
        await UserService.changeUserType(id, type as UserType);
        return res.status(200).json("User type changed");
      } catch (error: any) {
        return res.status(500).json(error.message);
      }
    }
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
  if (email) {
    const cocktails = req.query.cocktails; //for favorite cocktails
    const cocktailId = parseInt(req.query.cocktailId as string, 10); //for adding favorite cocktails
    const insightId = parseInt(req.query.insightId as string, 10); //for adding insight to read
    const firstName = req.query.firstName as string; // for updating user info
    const lastName = req.query.lastName as string; // for updating user info
    const password = req.query.password as string; // for updating user info
    const allLikedFlavours = req.query.allLikedFlavours; //for getting all liked flavours
    const likedFlavours = req.query.likedFlavours as string; //for adding liked flavours
    if (cocktails) {
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
    if (firstName && lastName && password) {
      try {
        await UserService.updateUserInfo(email, firstName, lastName, password);
        return res.status(200).json("User updated");
      } catch (error: any) {
        return res.status(500).json(error.message);
      }
    }
    if (cocktailId) {
      try {
        await UserService.addCocktailToFavorite(email, cocktailId);
        return res.status(200).json("Cocktail added to favorites");
      } catch (error: any) {
        return res.status(500).json(error.message);
      }
    }
    if (insightId) {
      try {
        await UserService.addInsightToRead(email, insightId);
        return res.status(200).json("Insight added to read");
      } catch (error: any) {
        return res.status(500).json(error.message);
      }
    }
    if (allLikedFlavours) {
      try {
        const flavours = await UserService.getLikedFlavours(email);
        if (flavours) {
          return res.status(200).json(flavours);
        }
        return res.status(404).json("No flavors found");
      } catch (error: any) {
        return res.status(500).json(error.message);
      }
    }
    if (likedFlavours) {
      let flavours = likedFlavours.split(",").map((flavour: string) => {
        return {
          name: flavour,
        };
      });
      try {
        await UserService.addLikedFlavour(email, flavours);
        return res.status(200).json("Flavors added");
      } catch (error: any) {
        return res.status(500).json(error.message);
      }
    }
  }
  return res.status(400).json("Bad request");
});

//deleteUser -- ~()~/api/users/user?id=...
usersRouter.delete("/user", async (req: Request, res: Response) => {
  const id = parseInt(req.query.id as string, 10);
  const email = req.query.email as string;
  if (id) {
    try {
      await UserService.deleteUser(id);
      return res.status(200).json("User deleted");
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
  if (email) {
    const cocktailId = parseInt(req.query.cocktailId as string, 10);
    const likedFlavours = req.params.likedFlavours as string;
    if (cocktailId) {
      try {
        await UserService.deleteCocktailFromFavorite(email, cocktailId);
        return res.status(200).json("Cocktail deleted from favorites");
      } catch (error: any) {
        return res.status(500).json(error.message);
      }
    }
    if (likedFlavours) {
      let flavours = likedFlavours.split(",").map((flavour: string) => {
        return {
          name: flavour,
        };
      });
      if (flavours) {
        try {
          await UserService.removeLikedFlavour(email, flavours);
          return res.status(200).json("Flavors deleted");
        } catch (error: any) {
          return res.status(500).json(error.message);
        }
      }
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
