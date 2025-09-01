import { productModel } from "../models/product.model";
import { ProductType } from "../lib/types";

export const productService = {
  addProduct: async (data: ProductType) => {
    const product = await productModel.addProduct(data);
    return product;
  },

  getAllProducts: async () => {
    const products = await productModel.getAllProducts();
    return products;
  },

  getProductById: async (id: string) => {
    const product = await productModel.getProductById(id);
    return product;
  },

  updateProduct: async (id: string, data: Partial<ProductType>) => {
    const product = await productModel.updateProduct(id, data);
    return product;
  },

  deleteProduct: async (id: string) => {
    const result = await productModel.deleteProduct(id);
    return result;
  },
};
