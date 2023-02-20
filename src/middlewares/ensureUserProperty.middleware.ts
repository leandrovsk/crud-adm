import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const ensureUserProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.user.admin && req.user.id !== parseInt(req.params.id)) {
    throw new AppError("Insufficient Permission", 403);
  }

  next();
};

export default ensureUserProperty;
