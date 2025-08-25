import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

// Sign up
router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

export default router;
