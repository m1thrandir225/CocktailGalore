import { body, validationResult } from "express-validator";
import express from "express";
import type { Request, Response } from "express";
import * as FlavourController from "../controllers/flavourController";

export const flavourRouter = express.Router();

flavourRouter.get("/", async (req: Request, res: Response) => {
  try {
    const flavours = await FlavourController.getFlavours();
    return res.status(200).send({
      flavours: flavours.map((flavour) => ({
        id: flavour.id,
        name: flavour.name,
      })),
    });
  } catch (err: any) {
    return res.status(500).send({ message: err.message });
  }
});

flavourRouter.get(
  "/flavour",
  body("id").notEmpty().isNumeric(),
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    try {
      const flavour = await FlavourController.getFlavour(
        parseInt(id as string, 10),
      );
      if (!flavour) {
        return res.status(404).send({ message: "Flavour not found" });
      }
      return res.status(200).send({
        flavour: {
          id: flavour.id,
          name: flavour.name,
        },
      });
    } catch (err: any) {
      return res.status(500).send({ message: err.message });
    }
  },
);
