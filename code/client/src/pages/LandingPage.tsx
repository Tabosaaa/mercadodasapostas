import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import SideCart from "../components/SideCart";
import { useState } from "react";

const LandingPage: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Navbar setOpen={setOpen} />
      <div className="grid lg:grid-cols4 md:grid-cols-3 sm:grid-cols-2 gap-5 items-baseline mt-3">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <SideCart open={open} setOpen={setOpen} />
    </>
  );
};

export default LandingPage;
