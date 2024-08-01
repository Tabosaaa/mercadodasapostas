import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import SideCart from "../components/SideCart";
import { useState } from "react";
import { products } from "../services/Products";

const LandingPage: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar setOpen={setOpen} />
      <div className="grid lg:grid-cols4 md:grid-cols-3 sm:grid-cols-2 gap-5 items-baseline mt-3  ">
        {products.map((product) => (
          <ProductCard
            id={product.id}
            name={product.name}
            price={product.price}
            description={product.description}
            imageSrc={product.imageSrc}
          />
        ))}
      </div>
      <SideCart open={open} setOpen={setOpen} />
    </>
  );
};

export default LandingPage;
