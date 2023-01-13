import { db } from "../utils/db.server";
import type { Request, Response } from "express";

export const getCocktails = async (req: Request, res: Response) => {
  const cocktails = await db.cocktail.findMany({
    select: {
      updatedAt: false,
      createdAt: false,
    },
  });
  if (!cocktails) {
    return res.status(404).json({ message: "Cocktails not found" });
  }
  return res.status(200).json({
    cocktails: cocktails,
  });
};

export const getCategories = async (req: Request, res: Response) => {
  const categories = await db.cocktailCategory.findMany();
  if (!categories) {
    return res.status(404).json({ message: "Categories not found" });
  }
  return res.status(200).json({
    categories: categories,
  });
};

export const getCocktail = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);

  const cocktail = await db.cocktail.findUnique({
    where: {
      id: id,
    },
  });
  if (!cocktail) {
    return res.status(404).json({ message: "Cocktail not found" });
  }
  return res.status(200).json({
    cocktail: cocktail,
  });
};

export const getCocktailsByCategory = async (req: Request, res: Response) => {
  const category = req.params.category as string;
  const cocktails = await db.cocktail.findMany({
    where: {
      category: {
        every: {
          name: {
            equals: category,
          },
        },
      },
    },
  });
  if (!cocktails) {
    return res.status(404).json({ message: "Cocktails not found" });
  }
  return res.status(200).json({
    cocktails: cocktails,
  });
};
