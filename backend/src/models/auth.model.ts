import db from "../config/db";
import { UserType } from "../lib/types";

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
};
