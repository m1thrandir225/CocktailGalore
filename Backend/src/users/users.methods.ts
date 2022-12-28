import { db } from "../utils/db.server";
import type { Request, Response } from "express";
import type { User, Cocktail, UserType, Flavour } from ".prisma/client";
//get current user

export const getUser = async (id: number): Promise<User | null> => {
  return await db.user.findUnique({
    where: {
      id: id,
    },
  });
};

//get all users

export const getAllUsers = async (): Promise<User[]> => {
  return await db.user.findMany();
};

//update user iformation
export const updateUserInfo = async (
  email: string | undefined,
  firstName: string | undefined,
  lastName: string | undefined,
  password: string | undefined,
): Promise<void> => {
  await db.user.update({
    where: {
      email: email,
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    },
  });
};

//delete user
export const deleteUser = async (id: number): Promise<void> => {
  await db.user.delete({
    where: {
      id: id,
    },
  });
};
//get user favorites
export const getUserFavoriteCocktails = async (
  email: string,
): Promise<{ favouriteCocktails: Cocktail[] } | null> => {
  return await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      favouriteCocktails: true,
    },
  });
};
//add user favorite
export const addCocktailToFavorite = async (
  email: string,
  cocktailId: number,
): Promise<void> => {
  await db.user.update({
    where: {
      email: email,
    },
    data: {
      favouriteCocktails: {
        connect: {
          id: cocktailId,
        },
      },
    },
  });
};
//delete user favorite
export const deleteCocktailFromFavorite = async (
  email: string,
  cocktailId: number,
): Promise<void> => {
  await db.user.update({
    where: {
      email: email,
    },
    data: {
      favouriteCocktails: {
        disconnect: {
          id: cocktailId,
        },
      },
    },
  });
};
//add insight to read by user
export const addInsightToRead = async (
  email: string,
  insightId: number,
): Promise<void> => {
  await db.user.update({
    where: {
      email: email,
    },
    data: {
      readInsights: {
        set: {
          id: insightId,
        },
      },
    },
  });
};
//get liked flavours
export const getLikedFlavours = async (
  emai: string,
): Promise<{ likedFlavours: Flavour[] } | null> => {
  return await db.user.findUnique({
    where: {
      email: emai,
    },
    select: {
      likedFlavours: true,
    },
  });
};

//add liked flavours
export const addLikedFlavour = async (
  email: string,
  flavours: { name: string }[],
): Promise<void> => {
  await db.user.update({
    where: {
      email: email,
    },
    data: {
      likedFlavours: {
        connect: flavours,
      },
    },
  });
};
//remove liked flavours
export const removeLikedFlavour = async (
  email: string,
  flavours: { name: string }[],
): Promise<void> => {
  await db.user.update({
    where: {
      email: email,
    },
    data: {
      likedFlavours: {
        disconnect: flavours,
      },
    },
  });
};

//change user type
export const changeUserType = async (
  id: number,
  userType: UserType,
): Promise<void> => {
  await db.user.update({
    where: {
      id: id,
    },
    data: {
      userType: {
        set: userType,
      },
    },
  });
};
