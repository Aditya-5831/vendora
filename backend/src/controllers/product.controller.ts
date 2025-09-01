import { NextFunction, Request, Response } from "express";
import { AppError } from "../middlewares/error.middleware";
import { productService } from "../services/product.service";

export const productController = {
  addProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const product = await productService.addProduct(data);

      if (!product) {
        throw new AppError("Failed to create product", 401);
      }

      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productService.getAllProducts();

      if (!products) {
        throw new AppError("No products found", 404);
      }

      return res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        products,
      });
    } catch (error) {
      next(error);
    }
  },

  getProductById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.getProductById(req.params.id);

      if (!product) {
        throw new AppError("Product not found", 404);
      }

      return res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        product,
      });
    } catch (error) {
      next(error);
    }
  },

  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body
      );

      if (!product) {
        throw new AppError("Failed to update product", 400);
      }

      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productService.deleteProduct(req.params.id);

      if (!result) {
        throw new AppError("Failed to delete product", 400);
      }

      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
