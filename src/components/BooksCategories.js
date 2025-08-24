import React, { useContext, useEffect, useState } from "react";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { ProductContext } from "../contexts/ProductsContext";
import { Link } from "react-router-dom";
import Button from "./Button";
import { FaCartShopping } from "react-icons/fa6";
import "./BooksCategories.css";
import { useLocation } from "react-router-dom";

const BooksCategories = () => {
  const { allBooks, getAllProducts } = useContext(ProductContext);
  const [isGrid, setIsGrid] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  console.log("this is category ... ", category);

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleClick = (viewType) => {
    setIsGrid(viewType === "grid");
  };

  return (
    <div className="md:pl-20 lg:pl-20 md:pr-20 lg:pr-20 pl-5 pr-5">
      {/* category image dynamic */}
      <div className="overflow-hidden mt-20 ">
        <img
          src="https://htmldemo.net/koparion/koparion/img/banner/32.jpg"
          alt="About Image"
          className="w-full hover:scale-110 ease-in-out duration-200 "
        />
      </div>
      <div className="pt-10 pb-10">
        <p className="text-xl md:text-2xl  lg:text-2xl font-bold capitalize">
          {category}
        </p>
      </div>
      {/* icon grid and list  */}
      <div className="flex gap-3 border-b-[2px] border-black pb-2 mb-10">
        <div
          onClick={() => handleClick("grid")}
          className={`${
            isGrid ? "active" : ""
          } flex gap-2 items-center border-r-[2px] border-black pr-2 cursor-pointer hover:text-orange-400 duration-200 `}
        >
          <IoGrid className="text-xl md:text-4xl lg:text-4xl " />
          <span className="text-xl   md:text-3xl  lg:text-3xl">GRID</span>
        </div>
        <div
          onClick={() => handleClick("list")}
          className={`${
            isGrid ? "" : "active"
          } flex gap-2 cursor-pointer items-center  hover:text-orange-400 duration-200`}
        >
          <FaList className="text-xl md:text-4xl lg:text-4xl" />
          <span className="text-xl   md:text-3xl  lg:text-3xl">LIST</span>
        </div>
      </div>

      {/* Content Div  */}
      <div>
        {/* Grid View  */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${
            isGrid ? "block" : "hidden"
          }  `}
        >
          {allBooks.map(({ image, title, _id, price }) => (
            <div
              key={`dup-${_id}`}
              className="flex flex-col items-center gap-4"
            >
              <div className=""></div>
              <Link to={`/productDetails/${_id}`}>
                <img src={image} alt={title} width={200} />
              </Link>

              <p className="text-center rufina rufina1 font-extrabold text-sm md:text-xl lg:text-xl">
                {title}
              </p>
              <p className="text-center rufina rufina1 text-sm md:text-xl lg:text-2xl">
                ${price}
              </p>
            </div>
          ))}
        </div>
        {/* List View  */}
        <div className={`flex flex-col gap-5 ${isGrid ? "hidden" : "block"} `}>
          {allBooks.map(({ image, title, _id, price, details }) => (
            <div
              key={`dup-${_id}`}
              className="flex flex-col md:flex-row lg:flex-row items-center"
            >
              <div className="md:w-1/4 lg:w-1/4  flex justify-center items-center">
                <Link to={`/productDetails/${_id}`}>
                  <img src={image} alt={title} width={200} />
                </Link>
              </div>
              <div className="flex flex-col  items-start md:w-3/4 lg:w-3/4  gap-4">
                <div className=" border-b-[1px] p-5 border-black">
                  <p className="  rufina rufina1 text-xl md:text-3xl lg:text-3xl">
                    {title.slice(0, 20)}
                  </p>
                  <div className="flex items-center gap-2 rufina rufina1">
                    <p className="text-center text-lg md:text-xl lg:text-xl">
                      ${price}
                    </p>
                    <span className="line-through text-lg md:text-xl lg:text-xl">
                      ${price}
                    </span>
                  </div>
                  <p className="text-sm md:text-xl lg:text-xl">
                    ${details.slice(0, 250)}...
                  </p>
                </div>
                <div className="flex items-center gap-3  cursor-pointer">
                  <FaCartShopping />
                  <p>Add to Cart</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksCategories;
