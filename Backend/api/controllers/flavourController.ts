import { db } from "../utils/db.server";

export const getFlavours = async () => {
  return await db.flavour.findMany();
};

export const getFlavour = async (id: number) => {
  return await db.flavour.findUnique({
    where: {
      id: id,
    },
  });
};
