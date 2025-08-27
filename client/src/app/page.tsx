import ProductList from "@/components/shared/ProductList";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative flex w-full items-center justify-center">
        <h2 className="text-9xl font-bold">Nike</h2>

        <div className="relative mt-10 mb-20 h-[500px] w-[500px]">
          <Image src="/hero.png" alt="Description" fill />
        </div>

        <h2 className="text-9xl font-bold">Air Pro</h2>
      </div>
      <ProductList />
    </div>
  );
};

export default HomePage;
