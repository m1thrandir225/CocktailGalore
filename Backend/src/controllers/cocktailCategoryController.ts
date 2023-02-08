import express from "express";
import { db } from "../utils/db.server";
import type { Request, Response } from "express";

export const getCocktailCategories = async (req: Request, res: Response) => {
  const categories = await db.cocktailCategory.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  if (categories.length === 0) {
    return res.status(404).send("No cocktail categories found");
  }
  return res.status(200).json({
    categories: categories,
  });
};

export const getCocktailCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  const category = await db.cocktailCategory.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
    },
  });
  if (!category) {
    res.status(404).send("No cocktail category found");
  }
  res.status(200).json(category);
};

export const createCocktailCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  const category = await db.cocktailCategory.create({
    data: {
      name: name,
    },
  });
  if (!category) {
    res.status(404).send("No cocktail category created");
  }
  return res.status(200).json(category);
};

export const updateCocktailCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  const { name } = req.body;
  const category = await db.cocktailCategory.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });
  if (!category) {
    res.status(404).send("No cocktail category updated");
  }
  return res.status(200).json(category);
};

export const deleteCocktailCategory = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  try {
    const disconnectCategory = await db.cocktailCategory.update({
      where: {
        id,
      },
      data: {
        cocktails: {
          set: [],
        },
      },
    });
    const category = await db.cocktailCategory.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json("Cocktail category deleted");
  } catch (error: any) {
    return res.status(404).json("Error deleting cocktail category");
  }
};

export const deleteCocktailCategories = async (req: Request, res: Response) => {
  const { ids } = req.body;
  if (!ids) {
    return res.status(404).json("No cocktail categories to delete");
  }
  try {
    ids
      .map(async (id: number) => {
        const disconnectCategory = await db.cocktailCategory.update({
          where: {
            id,
          },
          data: {
            cocktails: {
              set: [],
            },
          },
        });
      })
      .then(async () => {
        const categories = await db.cocktailCategory.deleteMany({
          where: {
            id: {
              in: ids,
            },
          },
        });
      })
      .then(() => {
        return res.status(200).json("Cocktail categories deleted");
      });
  } catch (err: any) {
    return res.status(404).json("Error deleting cocktail categories");
  }
};
