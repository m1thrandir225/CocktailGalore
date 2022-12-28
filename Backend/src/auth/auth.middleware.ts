import type { Request, Response, NextFunction } from "express";
import express from "express";

//verify token middleware
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.body.token = bearerToken;
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
};
