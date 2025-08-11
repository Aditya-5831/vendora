"use client";

import { ProductType } from "@/lib/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const handleProductType = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div className="overflow-hidden rounded-lg shadow-lg">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[3/4]">
          <Image
            src={product.images[productTypes.color]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        <div className="flex items-center gap-4 text-xs">
          {/* Sizes */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <Select>
              <SelectTrigger className="w-[70px] uppercase">
                <SelectValue
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleProductType({
                      type: "size",
                      value: e.target.value,
                    })
                  }
                  defaultValue={product.sizes[0]}
                  placeholder={productTypes.size}
                />
              </SelectTrigger>
              <SelectContent className="min-w-[3rem]">
                <SelectGroup>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size} className="uppercase">
                      {size}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Colors */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Color</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className={cn(
                    "cursor-pointer rounded-full border-1 p-[1.1px]",
                    productTypes.color === color
                      ? "ring-[1.4px] ring-gray-400"
                      : "border-transparent",
                  )}
                >
                  <div
                    onClick={() =>
                      handleProductType({ type: "color", value: color })
                    }
                    className="h-[14px] w-[14px] rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          <Button className="flex w-fit items-center gap-2">
            <ShoppingCart />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
