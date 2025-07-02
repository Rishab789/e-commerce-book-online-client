import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
// import { booksData } from "../services/booksData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { ProductContext } from "../contexts/ProductsContext";

const FeaturedBooks = () => {
  const [isDivHover, setDivHover] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 8;

  // const totalGroups = Math.ceil(booksData.length / itemsPerPage);
  const { allBooks, getAllProducts } = useContext(ProductContext);

  // const [allBooks, setAllBooks] = useState([]);  // this has been changed

  const rightHandler = () => {
    if (currentIndex < totalGroups - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const leftHandler = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  // const getAllProducts = async () => {   // AND THIS HAS BEEN COMMENTED OUT
  //   try {
  //     let req = await axios.get("http://localhost:4000/api/v1/getProducts");

  //     setAllBooks(req.data.response);
  //   } catch (err) {
  //     console.log("Some Error coming while fetching!");
  //   }
  // };

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  const productGroups = chunkArray(allBooks, itemsPerPage);
  // const productGroups = chunkArray(booksData, itemsPerPage);
  const totalGroups = Math.ceil(allBooks.length / itemsPerPage);

  return (
    <div
      className="border-t mt-20 container relative "
      onMouseEnter={() => setDivHover(true)}
      onMouseLeave={() => setDivHover(false)}
    >
      <section className="pt-20 ">
        <div className="text-3xl font-bold text-center ">FEATURED BOOKS</div>
        <div className="">
          <div className="overflow-hidden">
            <div
              className="flex pt-10 transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {productGroups.map((group, id) => (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 min-w-full"
                  key={id}
                >
                  {group.map((item, index) => (
                    <div key={index} className="shrink-0">
                      <img src={item.image} alt={item.title} width={250} />
                      <p className="text-center rufina1">{item.title}</p>
                      <p className="text-center rufina1">${item.price}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation arrows  */}
        <div className="">
          <div
            className={`absolute top-[45%] left-0 right-0 flex justify-between items-center px-10 transition-opacity duration-500 ${
              isDivHover ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="bg-primary-color p-3 rounded-md cursor-pointer hover:bg-[#f07c29] hover:text-white duration-500"
              onClick={leftHandler}
            >
              <FaChevronLeft style={{ fontSize: 40 }} />
            </div>
            <div
              className="bg-primary-color p-3 rounded-md cursor-pointer hover:bg-[#f07c29] hover:text-white duration-500"
              onClick={rightHandler}
            >
              <FaChevronRight style={{ fontSize: 40 }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedBooks;
