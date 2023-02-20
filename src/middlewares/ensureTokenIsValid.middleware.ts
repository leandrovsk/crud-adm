import { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";

const ensureTokenIsValidMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing Bearer Token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    req.user = {
      id: parseInt(decoded.sub),
      admin: decoded.admin,
    };
  });

  next();
};

export default ensureTokenIsValidMiddleware;
