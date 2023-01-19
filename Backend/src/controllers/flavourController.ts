import { db } from "../utils/db.server";
import type { Request, Response } from "express";
import { validationResult } from "express-validator";
export async function allFlavours(req: Request, res: Response) {
  const flavours = await db.flavour.findMany();
  if (!flavours) {
    return res.status(404).send({ message: "No flavours found" });
  }
  return res.status(200).json({
    flavours: flavours.map((flavour) => {
      return {
        id: flavour.id,
        name: flavour.name,
      };
    }),
  });
}

export async function getFlavour(req: Request, res: Response) {
  const { id } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  const flavour = await db.flavour.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
    },
  });
  if (!flavour) {
    return res.status(404).send({ message: "No flavour found" });
  }
  return res.status(200).send({
    flavour,
  });
}
