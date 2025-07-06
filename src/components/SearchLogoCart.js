import React, { useContext, useEffect, useState } from "react";
import { IoIosCart } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import "./SearchLogoCart.css";
import { Link } from "react-router-dom";
import { LogInContext } from "../contexts/LogInContext";
import logo from "../assets/novelezLogo.png";

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
    <section className="w-full lg:relative">
      <div className="flex flex-col   md:flex-row  lg:flex-row justify-between items-center pt-10 pb-10 md:pt-0 md:pb-0 lg:pt-0 lg:pb-0    pl-10 pr-10 h-64 md:h-44 lg:h-44">
        {/* search */}
        <div className="flex w-full md:w-56 lg:w-56 ">
          <input
            type="text"
            placeholder="Search Entire Store Here"
            className="rounded-tl rounded-bl h-10 bg-[#dedede] pl-2 w-full md:w-56 lg:w-56 "
            id="search"
          />
          <button className="rounded-tr rounded-br pr-3 pl-3 bg-secondary-color text-white">
            <FaSearch />
          </button>
        </div>

        {/* logo */}
        <div className="lg:absolute right-[45%]">
          <Link to="/">
            {/* <p className="text-4xl">Logo</p> */}
            <img src={logo} className="w-28 md:w-40 lg:w-52 md:h-40  lg:h-40" />
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
