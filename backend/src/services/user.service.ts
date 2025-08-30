import { AppError } from "../middlewares/error.middleware";
import { userModel } from "../models/user.model";

export const userService = {
  fetchCurrentUser: async (id: string) => {
    const user = await userModel.fetchCurrentUser(id);

    if (!user) {
      throw new AppError("User not found", 401);
    }

    return user;
  },
};
