import { Router } from "express";
import { productController } from "../controllers/product.controller";
import authorize from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

router.post(
  "/",
  // authorize,
  // requireRole(["ADMIN"]),
  productController.addProduct
);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put(
  "/:id",
  authorize,
  requireRole(["ADMIN"]),
  productController.updateProduct
);
router.delete(
  "/:id",
  authorize,
  requireRole(["ADMIN"]),
  productController.deleteProduct
);

export default router;
