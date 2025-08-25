import { NextFunction, Request, Response } from "express";
import { signInSchema, signUpSchema } from "../lib/auth.validation";
import { AppError } from "../middlewares/error.middleware";
import { authService } from "../services/auth.service";

export const authController = {
  signUp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = signUpSchema.safeParse(req.body);

      if (!userData.success) {
        const validationError = userData.error.issues.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));
        throw new AppError("Validation failed", 400, validationError);
      }

      const { data } = userData;

      const { user, accessToken, refreshToken } = await authService.signUp(
        data
      );

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  },

  signIn: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = signInSchema.safeParse(req.body);

      if (!userData.success) {
        const validationError = userData.error.issues.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));
        throw new AppError("Validation failed", 400, validationError);
      }

      const { data } = userData;

      const { user, accessToken, refreshToken } = await authService.signIn(
        data
      );
      return res.status(200).json({
        success: true,
        message: "User signed in successfully",
        user,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;

      const { accessToken } = await authService.refresh(refreshToken);

      return res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  },
};
