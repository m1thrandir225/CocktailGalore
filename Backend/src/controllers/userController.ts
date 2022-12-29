import { User } from "@prisma/client";
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
}): Promise<User | null> => {
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
export const getUser = async ({ id }: { id: number }): Promise<User | null> => {
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

export const getUserByEmail = async ({
  email,
}: {
  email: string;
}): Promise<User | null> => {
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

//update user passwword

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
