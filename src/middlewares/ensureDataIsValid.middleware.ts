import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../errors";

const ensureDataIsValid = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const requestKeys = Object.keys(req.body);
  const requiredKeys = ["name", "email", "password"];

  const validatedKeys = requestKeys.some((key) => requiredKeys.includes(key));

  if (!validatedKeys) {
    throw new AppError("Empty or invalid fields", 400);
  }

  const validatedData = schema.parse(req.body);

  req.body = validatedData;

  return next();
};

export default ensureDataIsValid;
