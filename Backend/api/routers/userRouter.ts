import type { Request, Response } from "express";
import express from "express";
import multer from "multer";
import * as UserController from "../controllers/userController";
export const userRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, `./public/`);
  },
  filename: function (req, res, cb) {
    cb(null, Date.now() + res.originalname);
  },
});
const upload = multer({ storage: storage });

userRouter.get("/user", async (req: Request, res: Response) => {
  const { id, email } = req.body;
  if (id) {
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
  } else if (email) {
    //get user by email
    const user = await UserController.getUserByEmail(email);
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
  } else {
    res.status(400).json({ message: "Bad Request" });
  }
});

//update user info
userRouter.post("/user", async (req: Request, res: Response) => {
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
  }: {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    oldPassword: string | undefined;
    newPassword: string | undefined;
    id: number | undefined;
    cocktailId: string | undefined;
    flavourIds: number[] | undefined;
    insightId: string | undefined;
  } = req.body;
  if (id) {
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
        console.log(req.body);
        console.log(flavourIds);
        const user = await UserController.addUserLikedFlavour(id, flavourIds);
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
    } else {
      //if no id is provided
      return res.status(400).json({ message: "Bad Request" });
    }
  }
});

userRouter.post(
  "/user/profileImage",
  upload.single("profileImage"),
  async (req: Request, res: Response) => {
    const { id, profileImage } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const newProfileImage = req.file?.filename;
    console.log(req.file);
    try {
      const updatedUser = await UserController.updateUserProfileImage(
        id,
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

userRouter.delete("/user", async (req: Request, res: Response) => {
  const { deleteUser } = req.query;
  const {
    id,
    likedFlavours,
  }: {
    id: string;
    likedFlavours: string[] | undefined;
  } = req.body;
  if (id) {
    //delete the user
    if (deleteUser == "true") {
      const user = await UserController.deleteUser(parseInt(id as string, 10));
      if (user) {
        return res.status(200).json({ message: "User deleted" });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } else if (likedFlavours) {
      //remove liked flavour from liked flavours
      const user = await UserController.deleteUserLikedFlavour(
        parseInt(id as string, 10),
        likedFlavours.map((id) => parseInt(id as string, 10)),
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
  } else {
    return res.status(400).json({ message: "Bad Request" });
  }
});
