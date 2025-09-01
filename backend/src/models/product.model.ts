import db from "../config/db";
import { ProductType } from "../lib/types";

export const productModel = {
  addProduct: async (data: ProductType) => {
    const product = await db.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        colors: data.colors,
        sizes: data.sizes,
        stockQuantity: data.stockQuantity,
      },
    });

    return product;
  },

  getAllProducts: async () => {
    const products = await db.product.findMany();
    return products;
  },

  getProductById: async (id: string) => {
    const product = await db.product.findUnique({
      where: {
        id,
      },
    });

    return product;
  },

  updateProduct: async (id: string, data: Partial<ProductType>) => {
    const product = await db.product.update({
      where: {
        id,
      },
      data,
    });

    return product;
  },

  deleteProduct: async (id: string) => {
    await db.product.delete({
      where: { id },
    });

    return {
      message: "Product deleted successfully",
    };
  },
};
