import type { Request, Response } from "express";
import { validationResult } from "express-validator";
import { v4 as uuid } from "uuid";
import { hashPassword, verifyPassword } from "../utils/authService";
import { db } from "../utils/db.server";
import { s3Delete } from "../utils/s3Service";
import { s3Uplaod } from "./../utils/s3Service";
import multer from "multer";
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "profileImage",
);

export async function getAllUsers(req: Request, res: Response) {
  const users = await db.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      userType: true,
      profileImage: true,
    },
  });
  return res.status(200).json({ users: users });
}

export async function getUser(req: Request, res: Response) {
  const id = parseInt(req.params.id as string, 10);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      profileImage: true,
      favouriteCocktails: true,
      likedFlavours: {
        select: {
          id: true,
          name: true,
        },
      },
      readInsights: true,
    },
  });
  if (!user) {
    return res.status(400).json({ errors: [{ msg: "User not found" }] });
  }
  return res.status(200).json({ user: user });
}

export async function updateUser(req: Request, res: Response) {
  const id = parseInt(req.params.id as string, 10);
  const {
    firstName,
    lastName,
    email,
    oldPassword,
    newPassword,
    cocktailId,
    flavourIds,
    insightId,
  } = req.body;
  const profileImage = req.file;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (firstName || lastName || email) {
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        email,
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
    if (!updateUser) {
      return res.status(400).json({ errors: [{ msg: "User not found" }] });
    }
    return res.status(200).json({
      user: updatedUser,
    });
  }
  if (cocktailId != undefined) {
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        favouriteCocktails: {
          connect: {
            id: cocktailId,
          },
        },
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
    if (!updatedUser) {
      return res.status(404).json({ errors: [{ msg: "User not found" }] });
    }
    return res.status(200).json({
      user: updatedUser,
    });
  }
  if (flavourIds) {
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        likedFlavours: {
          connect: flavourIds.map((flavourId: number) => ({ id: flavourId })),
        },
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
    if (!updatedUser) {
      return res.status(400).json({ errors: [{ msg: "User not found" }] });
    }
    return res.status(200).json({ user: updatedUser });
  }
  if (insightId) {
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        readInsights: {
          connect: {
            id: insightId,
          },
        },
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
    if (!updatedUser) {
      return res.status(400).json({ errors: [{ msg: "User not found" }] });
    }
    return res.status(200).json({ user: updateUser });
  }
  if (oldPassword && newPassword) {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "User not found" }] });
    }
    const isPasswordValid = await verifyPassword(oldPassword, user.password);
    if (isPasswordValid) {
      const newPasswordHash = await hashPassword(newPassword);
      const updatedUser = await db.user.update({
        where: {
          id,
        },
        data: {
          password: newPasswordHash,
        },
      });
      if (!updateUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Something went wrong" }] });
      }
      return res.status(200).json({ message: "Password updated" });
    }
  }
  if (profileImage) {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (user?.profileImage !== null && user?.profileImage !== undefined) {
      try {
        const deleteOldProfileImage = await s3Delete(
          user.profileImage,
          "userProfileImages",
        );
      } catch (error: any) {
        console.log(error);
      }
    }
    const newProfileImage = uuid() + profileImage.originalname;
    try {
      const imgResult = await s3Uplaod(
        req.file,
        "userProfileImages",
        newProfileImage,
      );
    } catch (error: any) {
      console.log(error);
    }
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        profileImage: newProfileImage,
      },
    });
    if (!updatedUser) {
      return res.status(400).json({ errors: [{ msg: "User not found" }] });
    }
    return res.status(200).json({ user: updatedUser });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const id = parseInt(req.params.id as string, 10);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //1. disconnect all records
  const userToDelete = await db.user.update({
    where: {
      id,
    },
    data: {
      favouriteCocktails: {
        set: [],
      },
      readInsights: {
        set: [],
      },
      likedFlavours: {
        set: [],
      },
    },
  });
  if (!userToDelete) {
    return res.status(400).json({ errors: [{ msg: "User not found" }] });
  }
  const deletedUser = await db.user.delete({
    where: {
      id,
    },
  });
  if (!deletedUser) {
    return res.status(400).json({ errors: [{ msg: "User not found" }] });
  }
  return res.status(200).json({ msg: "User deleted" });
}

export async function deleteUsers(req: Request, res: Response) {
  const { ids } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  if (!ids) {
    return res.status(400).json({ errors: [{ msg: "No ids provided" }] });
  }
  ids.map(async (id: number) => {
    const usersToDelete = await db.user.update({
      where: {
        id,
      },
      data: {
        favouriteCocktails: {
          set: [],
        },
        readInsights: {
          set: [],
        },
        likedFlavours: {
          set: [],
        },
      },
    });
    if (!usersToDelete) {
      return res.status(400).json({ errors: [{ msg: "User not found" }] });
    }
    const deletedUsers = await db.user.delete({
      where: {
        id,
      },
    });
    if (!deletedUsers) {
      return res.status(400).json({ errors: [{ msg: "User not found" }] });
    }
  });
  return res.status(200).json({ msg: "Users deleted" });
}
