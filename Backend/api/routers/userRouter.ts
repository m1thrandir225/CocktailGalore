import path from "path";
import type { Request, Response } from "express";
import express from "express";
import multer from "multer";
import * as UserController from "../controllers/userController";
import { body, validationResult } from "express-validator";

export const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./public");
  },
  filename: function (req, res, cb) {
    cb(null, Date.now() + res.originalname);
  },
});
const upload = multer({ storage: storage });

//get user data
userRouter.post(
  "/user",
  body("id").isNumeric().notEmpty(),
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //get user by id
    const user = await UserController.getUser(parseInt(id as string, 10));
    if (user) {
      res.status(200).json({
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
      res.status(404).json({ message: "User not found" });
    }
  },
);

//update user info
userRouter.post(
  "/updateUser",
  body("id").notEmpty().isNumeric(),
  body("email").isEmail().optional(),
  body(["cocktailId", "insightId"]).isNumeric().optional(),
  async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      email,
      oldPassword,
      newPassword,
      id,
      cocktailId,
      flavourIds,
      insightId,
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (cocktailId) {
      //add cocktail to favouriteCocktails
      try {
        const user = await UserController.addUserFavouriteCocktail(
          id,
          parseInt(cocktailId as string, 10),
        );
        if (user) {
          return res.status(200).json({
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
          return res.status(404).json({ message: "User not found" });
        }
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    } else if (flavourIds) {
      //add flavour to likedFlavours
      try {
        const user = await UserController.addUserLikedFlavour(
          id,
          flavourIds.map((id: string) => parseInt(id as string, 10)),
        );
        if (user) {
          return res.status(200).json({
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
          return res.status(404).json({ message: "User not found" });
        }
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    } else if (insightId) {
      //add insight to readInsights
      try {
        const user = await UserController.addUserReadInsight(
          id,
          parseInt(insightId as string, 10),
        );
        if (user) {
          return res.status(200).json({
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
          return res.status(404).json({ message: "User not found" });
        }
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    } else if (oldPassword && newPassword) {
      //update the password of the user
      try {
        const user = await UserController.getUser(id);
        if (user) {
          if (user.password == oldPassword) {
            const updatedUser = await UserController.updateUserBasicInfo(
              id,
              firstName,
              lastName,
              email,
              newPassword,
            );
            if (updatedUser) {
              return res.status(200).json({
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
              return res.status(404).json({ message: "User not found" });
            }
          } else {
            return res.status(401).json({ message: "Incorrect password" });
          }
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    } else if (oldPassword == undefined && newPassword == undefined) {
      //if no password change, no flavourIds, no cocktailId, no InsightId, then update basic info
      try {
        const user = await UserController.updateUserBasicInfo(
          id,
          firstName,
          lastName,
          email,
          undefined,
        );
        if (user) {
          return res.status(200).json({
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
          return res.status(404).json({ message: "User not found" });
        }
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
);

userRouter.post(
  "/updateUser/profileImage",
  upload.single("profileImage"),
  async (req: Request, res: Response) => {
    const { id, profileImage }: { id: string | number; profileImage: any } =
      req.body;
    if (!id) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const newProfileImage = req.file?.filename;
    try {
      const updatedUser = await UserController.updateUserProfileImage(
        parseInt(id as string, 10),
        newProfileImage,
      );
      return res.status(200).json({
        user: {
          id: updatedUser.id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          profileImage: updatedUser.profileImage,
          likedFlavours: updatedUser.likedFlavours,
          favouriteCocktails: updatedUser.favouriteCocktails,
          readInsights: updatedUser.readInsights,
        },
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  },
);

userRouter.delete(
  "/user",
  body("id").notEmpty().isNumeric(),
  async (req: Request, res: Response) => {
    const { deleteUser } = req.query;
    const { id, likedFlavours } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //delete the user
    if (deleteUser == "true") {
      const user = await UserController.deleteUser(id);
      if (user) {
        return res.status(200).json({ message: "User deleted" });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } else if (likedFlavours) {
      //remove liked flavour from liked flavours
      const user = await UserController.deleteUserLikedFlavour(
        parseInt(id as string, 10),
        likedFlavours,
      );
      if (user) {
        return res.status(200).json({
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
        return res.status(404).json({ message: "User not found" });
      }
    }
  },
);
