import React, { useState,useEffect } from "react";
import logo from "../assets/logo.png";
import { useSelector } from 'react-redux';

interface OpenCartButtonProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: React.FC<OpenCartButtonProps> = ({ setOpen }) => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const carts = useSelector((store: any) => store.cart.items);
  useEffect(() => {
    const total = carts.reduce((acc: number, item: any) => acc + item.quantity, 0);
    setTotalQuantity(total);
  }, [carts]);
  return (
    <nav className="relative bg-white border-b h-auto">
      <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <a href="/">
            <img
              className="w-auto h-6 sm:h-7"
              src={logo}
              alt="Logo"
            />
          </a>

          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={`${
            isOpen
              ? "translate-x-0 opacity-100"
              : "opacity-0 -translate-x-full"
          } absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center md:h-full`}
        >
          <div className="flex flex-col md:flex-row md:mx-6 ">
            {/* <a
              className="my-2 text-gray-700 transition-colors duration-300 transform hover:text-blue-500 md:mx-4 md:my-0"
              href="#"
            >
              Contact
            </a>
            <a
              className="my-2 text-gray-700 transition-colors duration-300 transform hover:text-blue-500 md:mx-4 md:my-0"
              href="#"
            >
              About
            </a> */}
            <a
              className="my-2 text-gray-700 transition-colors duration-300 transform hover:text-blue-500 md:mx-4 md:my-0"
              href="/signIn"
            >
              Log in
            </a>
            <div className="hidden md:block border-l border-gray-300 h-6 md:mx-3"></div>
            <a
              className="my-2 text-blue-700 transition-colors duration-300 transform hover:text-blue-500 md:mx-4 md:my-0"
              href="/signUp"
            >
              Criar conta
            </a>
          </div>

          <div className="flex justify-start md:justify-start mt-4 md:mt-0 md:ml-4" onClick={() => setOpen(true)}>
            <a
              className="relative text-gray-700 transition-colors duration-300 transform hover:text-gray-600"
              href="#"
            >
              <svg
                className="w-5 h-5"
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

              <span className="absolute -top-3.5 left-3 py-1 px-2 text-xs text-white bg-blue-500 rounded-full flex justify-center items-center">{totalQuantity}</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
