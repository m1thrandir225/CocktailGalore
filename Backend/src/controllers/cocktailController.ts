import { db } from "../utils/db.server";
import type { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { s3Delete, s3Uplaod } from "../utils/s3Service";

export const getCocktails = async (req: Request, res: Response) => {
  const cocktails = await db.cocktail.findMany({
    select: {
      updatedAt: false,
      createdAt: false,
      id: true,
      name: true,
      timeToMake: true,
      ingredients: true,
      instructions: true,
      image: true,
      flavours: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
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

export const createCocktail = async (req: Request, res: Response) => {
  let { name, instructions, ingredients, categoryIds, flavourIds } = req.body;
  const timeToMake = parseInt(req.body.timeToMake as string, 10);
  const cocktailImage = req.file;
  const imageName = uuid() + cocktailImage?.originalname;
  ingredients = JSON.parse(ingredients);
  instructions = JSON.parse(instructions);
  categoryIds = JSON.parse(categoryIds)
    .split(",")
    .map((id: string) => parseInt(id, 10));
  flavourIds = JSON.parse(flavourIds)
    .split(",")
    .map((id: string) => parseInt(id, 10));
  try {
    const cocktail = await db.cocktail
      .create({
        data: {
          name,
          image: imageName,
          instructions,
          ingredients,
          timeToMake,
          flavours: {
            connect: flavourIds.map((id: number) => ({ id: id })),
          },
          category: {
            connect: categoryIds.map((id: number) => ({ id: id })),
          },
        },
      })
      .then(
        async () => await s3Uplaod(cocktailImage, "cocktailImages", imageName),
      );

    if (!cocktail) {
      return res.status(400).json({ message: "Cocktail not created" });
    }
    return res.status(200).json({
      cocktail: cocktail,
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const updateCocktail = async (req: Request, res: Response) => {};

export const deleteCocktail = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  try {
    const disconnect = await db.cocktail.update({
      where: {
        id: id,
      },
      data: {
        category: {
          set: [],
        },
        flavours: {
          set: [],
        },
        favouriteBy: {
          set: [],
        },
      },
    });
    await s3Delete(disconnect.image, "cocktailImages");
    await db.cocktail.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({ message: "Cocktails deleted" });
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteCocktails = async (req: Request, res: Response) => {
  const { ids } = req.body;
  const errors = [];
  ids.forEach(async (id: number) => {
    try {
      const disconnect = await db.cocktail.update({
        where: {
          id: id,
        },
        data: {
          category: {
            set: [],
          },
          flavours: {
            set: [],
          },
          favouriteBy: {
            set: [],
          },
        },
      });
      await s3Delete(disconnect.image, "cocktailImages");
      await db.cocktail.delete({
        where: {
          id: id,
        },
      });
    } catch (err: any) {
      errors.push(err.message);
    }
  });
  if (errors.length > 0) {
    return res.status(400).json("Cocktails not deleted");
  }
  return res.status(200).json({ message: "Cocktails deleted" });
};
