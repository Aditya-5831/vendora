"use client";

import ProductDetailsFallback from "@/fallbacks/ProductDetailsFallback";
import apiRequest from "@/lib/apiRequest";
import { ProductType } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Dot, Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import ProductColors from "./ProductColors";
import ProductSizes from "./ProductSizes";
import ProductList from "../shared/ProductList";

interface ProductDetailsProps {
  productId: string;
}

const ProductDetails = ({ productId }: ProductDetailsProps) => {
  const { data: product } = useQuery<ProductType>({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = (await apiRequest.get(`/product/${productId}`)).data
        .product;

      return response;
    },
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleChangeImage = (image: string) => {
    setSelectedImage(image);
  };

  return !product ? (
    <ProductDetailsFallback />
  ) : (
    <div>
      <div className="my-10 flex items-start gap-12">
        <div className="relative flex h-[500px] w-1/2 gap-5">
          <div className="space-y-3">
            {product.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={product.name}
                width={100}
                height={100}
                className="cursor-pointer rounded-md bg-gray-100"
                onClick={() => handleChangeImage(image)}
              />
            ))}
          </div>
          <div className="relative h-full w-[500px] rounded-md bg-gray-100">
            <Image
              src={selectedImage || product.images[0]}
              alt={product.name}
              fill
            />
          </div>
        </div>
        <div className="flex w-1/2 flex-col space-y-5">
          <div className="space-y-1">
            <h2 className="text-4xl font-medium text-neutral-800">
              {product.name}
            </h2>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-gray-400">
                Shooes <Dot />
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                Sold 500+ <Dot />
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Star fill="gold" className="size-4 text-yellow-300" />
                <span>4.8 (241)</span>
              </span>
            </div>
          </div>

          {/* Sizes */}
          <ProductSizes sizes={product.sizes} />

          {/* Colors */}
          <ProductColors colors={product.colors} />

          <p className="text-xl font-medium text-neutral-800">
            ${product.price}
          </p>
          <p className="text-muted-foreground text-sm">{product.description}</p>
          <div className="flex items-center gap-3">
            <Button className="w-1/2 uppercase">Buy now</Button>
            <Button className="w-fit">
              <Heart />
            </Button>
            <Button className="w-fit">
              <ShoppingCart />
            </Button>
          </div>
        </div>
      </div>

      <div className="my-20">
        <h2 className="text-3xl font-semibold">Related Products</h2>
        <ProductList params="homePage" showCategories={false} />
      </div>
    </div>
  );
};

export default ProductDetails;
