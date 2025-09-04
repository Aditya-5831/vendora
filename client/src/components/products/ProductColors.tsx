import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProductColorsProps {
  colors: Array<string>;
}

const ProductColors = ({ colors }: ProductColorsProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColor = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="flex items-center gap-3">
      {colors.map((color) => (
        <div
          key={color}
          onClick={() => handleColor(color)}
          className={cn("size-5 cursor-pointer rounded-full", {
            "ring-[3px] ring-gray-300": color === selectedColor,
          })}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};

export default ProductColors;
