import { User } from "@prisma/client";
import { db } from "../utils/db.server";
import express from "express";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const generateAccessToken = (data: any) => {
  return jwt.sign(data, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: "30s",
  });
};
export const generateRefreshToken = (data: any) => {
  return jwt.sign(data, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "60d",
  });
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
