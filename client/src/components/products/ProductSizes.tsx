import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface ProductSizesProps {
  sizes: Array<string>;
}

const ProductSizes = ({ sizes }: ProductSizesProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSize = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <div className="flex items-center gap-3">
      {sizes.map((size) => (
        <div
          key={size}
          onClick={() => handleSize(size)}
          className={cn(
            "cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm",
            {
              "bg-gray-300": size === selectedSize,
            },
          )}
        >
          {size}
        </div>
      ))}
    </div>
  );
};

export default ProductSizes;
