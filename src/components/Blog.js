import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { blogsData } from "../services/blogsData";

const Blog = () => {
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
    if (currentIndex >= blogsData.length) {
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
    <div className=" relative bg-red-400">
      <section className="pt-20">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-center ">
          LATEST FROM OUR BLOGS
        </div>
        <div
          onMouseEnter={() => setDivHover(true)}
          onMouseLeave={() => setDivHover(false)}
        >
          <div className="cursor-pointer  gap-4 p-10 w-[85%] m-auto relative overflow-hidden ">
            <div
              className="flex gap-5 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 325}px)`,
              }}
              onTransitionEnd={handleTransitionEnd}
              ref={containerRef}
            >
              {blogsData.map((item, index) => (
                <div key={index} className="shrink-0 relative overflow-hidden ">
                  <div
                    className="absolute left-2 top-2 h-12 bg-white w-12 flex justify-center items-center flex-col z-10
                  "
                  >
                    <p className="text-xl">06</p>
                    <p>DEC</p>
                  </div>
                  <img
                    src={item.image}
                    alt={item.title}
                    width={300}
                    className="hover:scale-105 duration-300"
                  />
                  <p className="text-center rufina1 text-xl">{item.title}</p>
                  <p className="text-center  text-lg">{item.author}</p>
                  <p className="text-center rufina1 text-sm w-64  m-auto">
                    {item.content}
                  </p>
                </div>
              ))}
              {/* Duplicate images for infinite scroll effect */}
              {blogsData.map((item, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="shrink-0 relative overflow-hidden"
                >
                  <div
                    className="absolute left-2 top-2 h-12 bg-white w-12 flex justify-center items-center flex-col z-10
                  "
                  >
                    <p className="text-xl">06</p>
                    <p>DEC</p>
                  </div>
                  <img
                    src={item.image}
                    alt={item.title}
                    width={300}
                    className="hover:scale-105 duration-300"
                  />
                  <p className="text-center rufina1 text-xl">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Arrows */}
          <div
            className={`absolute bottom-[5%] left-14 right-14 flex justify-between items-center px-10 transition-opacity duration-500 ${
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

export default Blog;
