import express from "express";
import { body } from "express-validator";
import * as FlavourController from "../controllers/flavourController";

const flavourRouter = express.Router();

flavourRouter.get("/", FlavourController.allFlavours);

flavourRouter.get("/flavour/:id", FlavourController.getFlavour);

flavourRouter.post("/flavour/:id", FlavourController.createFlavour);

flavourRouter.put("/flavour/:id", FlavourController.updateFlavour);

flavourRouter.delete("/flavour/:id", FlavourController.deleteFlavour);

export default flavourRouter;
