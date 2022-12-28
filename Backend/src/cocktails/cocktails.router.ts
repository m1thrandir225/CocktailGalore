import express from "express";
import type { Request, Response } from "express";
import * as CocktailService from "./cocktails.methods";
export const cocktailsRouter = express.Router();

cocktailsRouter.get("/cocktail", async (req: Request, res: Response) => {
  const id = parseInt(req.query.id as string, 10);
  if (id) {
    try {
      const cocktail = await CocktailService.getCocktail(id);
      const total = await CocktailService.getTotalFavorites(id);
      if (cocktail) {
        return res.status(200).json({ Cocktail: cocktail, Likes: total });
      }
      return res.status(404).json({ message: "Cocktail not found" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  return res.status(400).json("Bad Request");
});

cocktailsRouter.delete("/cocktail", async (req: Request, res: Response) => {
  const id = parseInt(req.query.id as string, 10);
  if (id) {
    try {
      await CocktailService.deleteCocktail(id);
      return res.status(200).json("Cocktail deleted");
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
});

cocktailsRouter.post("/cocktail", async (req: Request, res: Response) => {
  const id = parseInt(req.query.id as string, 10);
  if (id) {
    const name = req.body.name;
    const ingredients = req.body.ingredients;
    const instructions = req.body.instructions;
    const image = req.body.image;
    const flavours = req.body.flavours;
    const timeToMake = req.body.timeToMake;
    if (
      name &&
      ingredients &&
      instructions &&
      image &&
      flavours &&
      timeToMake
    ) {
      try {
        await CocktailService.updateCocktail(
          id,
          name,
          ingredients,
          instructions,
          image,
          flavours,
          timeToMake,
        );
        return res.status(200).json("Cocktail updated");
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    }
  }
});
