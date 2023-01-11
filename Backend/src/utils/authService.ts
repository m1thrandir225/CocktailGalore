import { db } from "./db.server";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export function generateAccessToken(data: any) {
  return jwt.sign(data, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: "90s",
  });
}

export function generateRefreshToken(data: any) {
  return jwt.sign(data, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "60d",
  });
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
