import React from 'react';
import { ProductCardInterface } from '../interfaces/ProductCardInterface';
import { useSelector,useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart';

const ProductCard: React.FC<ProductCardInterface> = ({ id, name, price, description, imageSrc }) => {

  const carts = useSelector((store: any) => store.cart.items);
  console.log(carts);
  const dispatch = useDispatch()
  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: id,
      quantity:1,
    }))
  }
  return (
    <div className="relative flex flex-col h-full rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="relative mx-4 mt-4 h-96 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
        <img
          src={imageSrc}
          className="h-full w-full object-cover object-center"
          alt={name}
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-2 flex items-center justify-between">
          <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
            {name}
          </p>
          <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
            {price}
          </p>
        </div>
        <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75 flex-grow">
          {description}
        </p>
      </div>
      <div className="p-6 pt-0">
        <button onClick={handleAddToCart}
          className="flex items-center justify-center w-full select-none rounded-lg text-white bg-blue-700 hover:bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
