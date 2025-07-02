import React, { useRef, useState } from "react";
import { booksData } from "../services/booksData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FeaturedBooks = () => {
  const [isDivHover, setDivHover] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks current visible group
  const itemsPerPage = 8; // Number of items in each group
  const containerRef = useRef(null);

  const totalGroups = Math.ceil(booksData.length / itemsPerPage);
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

  // Helper to chunk the array into groups of 8
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
      console.log(result);
    }
    return result;
  };

  chunkArray(booksData, itemsPerPage);

  const productGroups = chunkArray(booksData, itemsPerPage);

  return (
    <div
      className="border-t mt-20 container relative"
      onMouseEnter={() => setDivHover(true)}
      onMouseLeave={() => setDivHover(false)}
    >
      <section className="pt-20">
        <div className="text-3xl font-bold text-center">FEATURED BOOKS</div>

        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
            ref={containerRef}
          >
            {productGroups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="grid grid-cols-4 gap-4 min-w-full"
              >
                {group.map((item, index) => (
                  <div key={index} className="text-center">
                    <img src={item.image} alt={item.title} width={250} />
                    <p className="rufina1">{item.title}</p>
                    <p className="rufina1">${item.price}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-[45%] left-0 right-0 flex justify-between items-center px-10 transition-opacity duration-500">
          <div
            className={`bg-primary-color p-3 rounded-md cursor-pointer hover:bg-[#f07c29] hover:text-white duration-500 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={leftHandler}
          >
            <FaChevronLeft style={{ fontSize: 40 }} />
          </div>
          <div
            className={`bg-primary-color p-3 rounded-md cursor-pointer hover:bg-[#f07c29] hover:text-white duration-500 ${
              currentIndex === totalGroups - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={rightHandler}
          >
            <FaChevronRight style={{ fontSize: 40 }} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedBooks;
