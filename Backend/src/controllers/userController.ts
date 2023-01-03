import { db } from "../utils/db.server";
import express from "express";
import * as jwt from "jsonwebtoken";
//create user
export const createUser = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  return await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  });
};
//get user -- get the user either through id, email or requestToken which are all unique and
// have different type of return results
export const getUser = async (id: number) => {
  if (id) {
    return await db.user.findUnique({
      where: {
        id,
      },
      include: {
        favouriteCocktails: true,
        readInsights: true,
        likedFlavours: true,
      },
    });
  }
  return null;
};

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
    include: {
      favouriteCocktails: true,
      readInsights: true,
      likedFlavours: true,
    },
  });
};
//update user info
export const updateUserBasicInfo = async (
  id: number,
  firstName: string | undefined,
  lastName: string | undefined,
  email: string | undefined,
  password: string | undefined,
) => {
  return await db.user.update({
    where: {
      id,
    },
    include: {
      favouriteCocktails: true,
      readInsights: true,
      likedFlavours: true,
    },
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  });
};
export const updateUserProfileImage = async (
  id: number,
  profileImage: string | undefined,
) => {
  return await db.user.update({
    where: {
      id,
    },
    include: {
      favouriteCocktails: true,
      readInsights: true,
      likedFlavours: true,
    },
    data: {
      profileImage,
    },
  });
};
//add user favourite cocktail
export const addUserFavouriteCocktail = async (
  id: number,
  cocktailId: number,
) => {
  return await db.user.update({
    where: {
      id,
    },
    include: {
      favouriteCocktails: true,
      readInsights: true,
      likedFlavours: true,
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
export const deleteUserFavouriteCocktail = async (
  id: number,
  cocktailId: number,
) => {
  return await db.user.update({
    where: {
      id,
    },
    include: {
      favouriteCocktails: true,
      readInsights: true,
      likedFlavours: true,
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

export const addUserLikedFlavour = async (id: number, flavourIds: number[]) => {
  return await db.user.update({
    where: {
      id,
    },
    include: {
      favouriteCocktails: true,
      readInsights: true,
      likedFlavours: true,
    },
    data: {
      likedFlavours: {
        connect: flavourIds.map((flavourId) => ({ id: flavourId })) || [],
      },
    },
  });
};
export const deleteUserLikedFlavour = async (
  id: number,
  flavourIds: number[],
) => {
  return await db.user.update({
    where: {
      id,
    },
    include: {
      favouriteCocktails: true,
      readInsights: true,
      likedFlavours: true,
    },
    data: {
      likedFlavours: {
        disconnect: flavourIds.map((flavourId) => ({ id: flavourId })) || [],
      },
    },
  });
};
export const addUserReadInsight = async (id: number, insightId: number) => {
  return await db.user.update({
    where: {
      id,
    },
    include: {
      favouriteCocktails: true,
      readInsights: true,
      likedFlavours: true,
    },
    data: {
      readInsights: {
        connect: {
          id: insightId,
        },
      },
    },
  });
};

//update user request token
export const setUserRequestToken = async (id: number, requestToken: string) => {
  return await db.user.update({
    where: {
      id,
    },
    data: {
      requestToken,
    },
  });
};

export const deleteUserRequestToken = async (id: number) => {
  return await db.user.update({
    where: {
      id,
    },
    data: {
      requestToken: null,
    },
  });
};
//delete user
export const deleteUser = async (id: number) => {
  return await db.user.delete({
    where: {
      id,
    },
  });
};
