import { Router } from "express";
import { userController } from "../controllers/user.Controller";
import authorize from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authorize, userController.getUserById);

export default router;
