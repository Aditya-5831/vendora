import { UserType } from "../lib/types";
import db from "../config/db";

export const authModel = {
  signUp: async (data: UserType) => {
    const user = await db.user.create({ data });
    return user;
  },

  signIn: async (email: string) => {
    const user = await db.user.findUnique({ where: { email } });
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
