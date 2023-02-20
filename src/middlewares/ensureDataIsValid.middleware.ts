import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const ensureDataIsValid = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const validatedData = schema.parse(req.body);

  req.body = validatedData;

  return next();
};

export default ensureDataIsValid;
