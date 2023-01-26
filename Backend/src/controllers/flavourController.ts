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
  const id = parseInt(req.params.id as string, 10);
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

export async function createFlavour(req: Request, res: Response) {
  const { name } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  const newFlavour = await db.flavour.create({
    data: {
      name: name,
    },
  });
  if (!newFlavour) {
    return res.status(400).send({ message: "Error creating flavour" });
  }
  return res.status(200).send({
    message: "Flavour created successfully",
  });
}

export async function updateFlavour(req: Request, res: Response) {
  const { name } = req.body;
  const id = parseInt(req.params.id as string, 10);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  const flavour = await db.flavour.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
  if (!flavour) {
    return res.status(400).send({ message: "Error updating flavour" });
  }
  return res.status(200).send({
    message: "Flavour updated successfully",
  });
}

export async function deleteFlavour(req: Request, res: Response) {
  const { ids } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  console.log(req.body);
  if (!ids) {
    return res.status(400).send({ message: "No ids provided" });
  }
  ids.map(async (id: number) => {
    const flavour = await db.flavour.update({
      where: {
        id,
      },
      data: {
        cocktails: {
          set: [],
        },
        likedBy: {
          set: [],
        },
      },
    });
    if (!flavour) {
      return res.status(400).send({ message: "Error deleting flavour" });
    }
    const deletedFlavour = await db.flavour.delete({
      where: {
        id,
      },
    });
    if (!deletedFlavour) {
      return res.status(400).send({ message: "Error deleting flavour" });
    }
  });
  return res.status(200).send({
    message: "Flavour deleted successfully",
  });
}
