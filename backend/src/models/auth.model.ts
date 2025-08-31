import db from "../config/db";
import { GoogleAuthType, UserType } from "../lib/types";

export const authModel = {
  signUp: async (data: UserType) => {
    const user = await db.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  },

  signIn: async (email: string) => {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  },

  logout: async (refreshToken: string) => {
    await db.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });
  },

  googleAuth: async ({
    providerId,
    profileEmail,
    displayName,
    accessToken,
    refreshToken,
  }: GoogleAuthType) => {
    const existingAccount = await db.account.findUnique({
      where: {
        provider_providerId: { provider: "google", providerId },
      },
      include: {
        user: true,
      },
    });

    if (existingAccount) {
      return existingAccount.user;
    }

    let user = await db.user.findUnique({
      where: {
        email: profileEmail,
      },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          email: profileEmail,
          name: displayName,
        },
      });
    }

    await db.account.create({
      data: {
        userId: user.id,
        provider: "google",
        providerId,
        accessToken,
        refreshToken,
      },
    });

    return user;
  },
};
