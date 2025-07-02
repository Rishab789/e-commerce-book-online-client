import React, { useState, useRef } from "react";
import { booksData } from "../services/booksData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Slider = () => {
  const [isDivHover, setDivHover] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const rightHandler = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const leftHandler = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= booksData.length) {
      // Disable transition and reset position to simulate seamless scrolling
      containerRef.current.style.transition = "none";
      setCurrentIndex(0); // Reset index
      containerRef.current.style.transform = `translateX(0px)`;

      // Re-enable transition after resetting
      setTimeout(() => {
        containerRef.current.style.transition = "transform 0.7s ease-in-out";
      });
    }
  };

  return (
    <div>
      <section className=" mt-20 relative ">
        {/* Main Container */}
        <div
          onMouseEnter={() => setDivHover(true)}
          onMouseLeave={() => setDivHover(false)}
        >
          <div className="cursor-pointer  gap-4 p-10 w-[100%] m-auto relative overflow-hidden ">
            <div
              className="flex  transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 250}px)`,
              }}
              onTransitionEnd={handleTransitionEnd}
              ref={containerRef}
            >
              {booksData.map((item, index) => (
                <div key={index} className="shrink-0">
                  <img src={item.image} alt={item.title} width={170} />
                  <p className="text-center rufina1">{item.title}</p>
                  <p className="text-center rufina1">${item.price}</p>
                </div>
              ))}
              {/* Duplicate images for infinite scroll effect */}
              {booksData.map((item, index) => (
                <div key={`duplicate-${index}`} className="shrink-0">
                  <img src={item.image} alt={item.title} width={170} />
                  <p className="text-center rufina1">{item.title}</p>
                  <p className="text-center rufina1">${item.price}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Arrows */}
          <div
            className={`absolute top-[45%] left-0 right-0 flex justify-between items-center  transition-opacity duration-500 ${
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

export default Slider;
