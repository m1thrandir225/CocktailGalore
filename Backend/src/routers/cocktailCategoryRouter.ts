import express from "express";
import * as CocktailCategoryController from "../controllers/cocktailCategoryController";

export const cocktailCategoryRouter = express.Router();

//get all cocktail categories
cocktailCategoryRouter.get(
  "/",
  CocktailCategoryController.getCocktailCategories,
);
//get cocktail category by id
cocktailCategoryRouter.get(
  "/category/:id",
  CocktailCategoryController.getCocktailCategory,
);
//create new cocktail category
cocktailCategoryRouter.post(
  "/",
  CocktailCategoryController.createCocktailCategory,
);
//update cocktail category
cocktailCategoryRouter.put(
  "/category/:id",
  CocktailCategoryController.updateCocktailCategory,
);
//delete single cocktail category
cocktailCategoryRouter.delete(
  "/category/:id",
  CocktailCategoryController.deleteCocktailCategory,
);

//delete multiple cocktail categories
cocktailCategoryRouter.delete(
  "/",
  CocktailCategoryController.deleteCocktailCategories,
);
