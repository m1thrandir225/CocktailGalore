import express from "express";
import * as CocktailController from "../controllers/cocktailController";
import multer from "multer";
const cocktailRouter = express.Router();

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, fileFilter: fileFilter });

//all cocktails
cocktailRouter.get("/", CocktailController.getCocktails);

//all categories of cocktails
cocktailRouter.get("/categories", CocktailController.getCategories);

//cocktail by id
cocktailRouter.get("/cocktail", CocktailController.getCocktail);
//cocktails by certain category
cocktailRouter.get("/:category", CocktailController.getCocktailsByCategory);

//create new cocktail
cocktailRouter.post(
  "/cocktail",
  upload.single("cocktailImage"),
  CocktailController.createCocktail,
);

//update cocktail
cocktailRouter.put("/cocktail/:id", CocktailController.updateCocktail);

//delete cocktail
cocktailRouter.delete("/cocktail/:id", CocktailController.deleteCocktail);

//delete mukltiple cocktails
cocktailRouter.delete("/", CocktailController.deleteCocktails);

export default cocktailRouter;
