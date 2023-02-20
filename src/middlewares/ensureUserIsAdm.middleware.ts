import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const ensureUserIsAdmMiddleware = (req: Request, res: Response, next: NextFunction) => {
  
  if (!req.user.admin) {
    throw new AppError("Insufficient Permission", 403);
  }

  next();
};

export default ensureUserIsAdmMiddleware;
