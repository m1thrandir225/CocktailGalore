import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"]?.split(" ");
  console.log(authHeader);
  if (typeof authHeader !== "undefined") {
    const token = authHeader[1];
    if (token == null) return res.sendStatus(401);
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
    req.body.id = decoded;
    next();
  } else {
    res.sendStatus(403);
  }
};

export default verifyToken;
