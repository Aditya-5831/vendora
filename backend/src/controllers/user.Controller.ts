import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { AppError } from "../middlewares/error.middleware";
import { userService } from "../services/user.service";

export const userController = {
  getUserById: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;

      console.log(userId);

      if (!userId) {
        throw new AppError("Unauthorized", 401);
      }

      const user = await userService.fetchCurrentUser(userId);

      return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        user,
      });
    } catch (error) {
      next(error);
    }
  },
};
