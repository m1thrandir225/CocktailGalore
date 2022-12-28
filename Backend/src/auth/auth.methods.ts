import { db } from "../utils/db.server";
import type { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
export const generateAccessToken = (data: any) => {
  return jwt.sign(data, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: "10s",
  });
};
export const generateRefreshToken = (data: any) => {
  return jwt.sign(data, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "60d",
  });
};

export const createUser = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string,
): Promise<User | null> => {
  return await db.user.create({
    data: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    },
  });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await db.user.findUnique({
    where: {
      email: email,
    },
  });
};
