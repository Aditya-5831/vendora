import bcrypt from "bcrypt";
import db from "../config/db";
import { GoogleAuthType, UserType } from "../lib/types";
import { AppError } from "../middlewares/error.middleware";
import { authModel } from "../models/auth.model";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokens";

export const authService = {
  signUp: async (data: UserType) => {
    const existingUser = await authModel.signIn(data.email);

    if (existingUser) {
      throw new AppError("User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await authModel.signUp({
      ...data,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    await db.refreshToken.create({
      data: {
        token: refreshToken,
        userId: newUser.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return { user: newUser, accessToken, refreshToken };
  },

  signIn: async (data: UserType) => {
    const user = await authModel.signIn(data.email);

    if (!user || !user.password) {
      throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }

    const { password, ...safeUser } = user;

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await db.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return { user: safeUser, accessToken, refreshToken };
  },

  logout: async (refreshToken: string) => {
    if (!refreshToken) {
      throw new AppError("Refresh token is required", 400);
    }

    await authModel.logout(refreshToken);

    return { message: "Logut success" };
  },

  refresh: async (refreshToken: string) => {
    if (!refreshToken) {
      throw new AppError("Refresh token is required", 400);
    }

    const stored = await db.refreshToken.findUnique({
      where: {
        token: refreshToken,
      },
    });

    if (!stored || stored.expiresAt < new Date()) {
      throw new AppError("Invalid refresh token", 403);
    }

    const payload = verifyRefreshToken(refreshToken);

    const accessToken = generateAccessToken(payload.userId);

    return { accessToken };
  },

  googleAuth: async (profile: GoogleAuthType) => {
    const user = await authModel.googleAuth(profile);
    return { user };
  },

  issueTokensForUser: async (userId: string) => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    await db.refreshToken.create({
      data: {
        token: refreshToken,
        userId: userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    return { accessToken, refreshToken };
  },
};
