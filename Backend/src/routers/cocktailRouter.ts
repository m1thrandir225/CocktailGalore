import express from "express";
import * as CocktailController from "../controllers/cocktailController";
const cocktailRouter = express.Router();

//all cocktails
cocktailRouter.get("/", CocktailController.getCocktails);

//all categories of cocktails
cocktailRouter.get("/categories", CocktailController.getCategories);

//cocktail by id
cocktailRouter.get("/cocktail/:id/", CocktailController.getCocktail);

//cocktails by certain category
cocktailRouter.get("/:category", CocktailController.getCocktailsByCategory);

export default cocktailRouter;
