import { NextFunction, Request, Response } from "express";
import { AppError } from "./error.middleware";

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as { id: string; role: string } | undefined;

      if (!user) {
        throw new AppError("Not authenticated", 401);
      }

      if (!roles.includes(user.role)) {
        throw new AppError("Forbidden: Insufficient information", 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
