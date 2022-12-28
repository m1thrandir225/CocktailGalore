import { Cocktail, Flavour } from "@prisma/client";
import { db } from "../utils/db.server";
import type { Request, Response } from "express";

//get Cocktail
export const getCocktail = async (id: number): Promise<Cocktail | null> => {
  return await db.cocktail.findUnique({
    where: {
      id: id,
    },
  });
};

//delete Cocktail
export const deleteCocktail = async (id: number): Promise<void> => {
  await db.cocktail.delete({
    where: {
      id: id,
    },
  });
};
//update Cocktail
export const updateCocktail = async (
  id: number,
  name: string | undefined,
  ingredients: string | undefined,
  instructions: string | undefined,
  image: string | undefined,
  flavours: Flavour[] | undefined,
  timeToMake: number | undefined,
): Promise<void> => {
  await db.cocktail.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      timeToMake: timeToMake,
      ingredients: ingredients,
      instructions: instructions,
      image: image,
      flavours: {
        connect: flavours,
      },
    },
  });
};
//add Cocktail
export const addCocktail = async (
  name: string,
  timeToMake: number,
  ingredients: string,
  instructions: string,
  image: string,
  flavours: Flavour[],
): Promise<Cocktail | null> => {
  return await db.cocktail.create({
    data: {
      name: name,
      timeToMake: timeToMake,
      ingredients: ingredients,
      instructions: instructions,
      image: image,
      flavours: {
        connect: flavours,
      },
    },
  });
};
//getTotalFavorites
export const getTotalFavorites = async (id: number): Promise<number> => {
  const total = await db.cocktail.findUnique({
    where: {
      id: id,
    },
    select: {
      favouriteBy: true,
    },
  });
  return total?.favouriteBy.length || 0;
};
