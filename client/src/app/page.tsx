import ProductList from "@/components/shared/ProductList";
import Image from "next/image";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <div className="relative aspect-[3/1] mt-10 mb-20">
        <Image src="/featured.png" alt="Description" fill />
      </div>
      <ProductList />
    </div>
  );
};

export default HomePage;
