export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: string[];
  stockQuantity: number;
};

export type ProductsType = ProductType[];
