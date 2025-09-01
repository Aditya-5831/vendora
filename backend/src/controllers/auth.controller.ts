import { NextFunction, Request, Response } from "express";
import passport from "passport";
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

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
        accessToken,
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

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: "User signed in successfully",
        user,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;

      await authService.logout(refreshToken);

      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      return res.status(200).json({
        success: true,
        message: "Logout success",
      });
    } catch (error) {
      next(error);
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;

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

  googleStart: passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),

  googleCallback: async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      "google",
      { session: false },
      async (err, user: any) => {
        try {
          if (err) {
            return next(err);
          }

          if (!user) {
            return res.redirect("http://localhost:3000/sign-in");
          }

          const { accessToken, refreshToken } =
            await authService.issueTokensForUser(user.id, user.role);

          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });

          return res.redirect("http://localhost:3000");
        } catch (error) {
          next(error);
        }
      }
    )(req, res, next);
  },
};
