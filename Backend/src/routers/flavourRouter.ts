import express from "express";
import { body } from "express-validator";
import * as FlavourController from "../controllers/flavourController";

const flavourRouter = express.Router();

flavourRouter.get("/", FlavourController.allFlavours);

flavourRouter.get(
  "/flavour",
  body("id").notEmpty().isNumeric(),
  FlavourController.getFlavour,
);

export default flavourRouter;
