import React, { useContext, useEffect, useState } from "react";
import { IoIosCart } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import "./SearchLogoCart.css";
import { Link } from "react-router-dom";
import { LogInContext } from "../contexts/LogInContext";

const SearchLogoCart = () => {
  const [cartLength, setCartLength] = useState(0);
  const { userId } = useContext(LogInContext);

  const updateCartLength = () => {
    if (!userId) return;

    const userCartKey = `cart_${userId}`;
    const products = JSON.parse(localStorage.getItem(userCartKey)) || [];
    setCartLength(products.length);
  };

  useEffect(() => {
    updateCartLength();

    const interval = setInterval(() => {
      updateCartLength();
    }, 1000); // check every 1 second

    return () => clearInterval(interval);
  }, [userId]);

  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row lg:flex-row justify-between items-center paddingClass">
        {/* search */}
        <div className="flex">
          <input
            type="text"
            placeholder="Search Books"
            className="rounded-tl rounded-bl h-10 bg-[#dedede] pl-2"
            id="search"
          />
          <button className="rounded-tr rounded-br pr-3 pl-3 bg-secondary-color text-white">
            <FaSearch />
          </button>
        </div>

        {/* logo */}
        <div>
          <Link to="/">
            <p className="text-4xl">Logo</p>
          </Link>
        </div>

        {/* cart */}
        <Link to="/cart">
          <div className="flex items-center hover:text-secondary-color hover:cursor-pointer">
            <div className="relative">
              <IoIosCart style={{ fontSize: 45 }} />
              {cartLength > 0 && (
                <div className="absolute -bottom-4 -right-2 bg-secondary-color text-white h-8 w-8 flex justify-center items-center rounded-full text-sm">
                  {cartLength}
                </div>
              )}
            </div>
            <p>MY CART</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default SearchLogoCart;
