import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { blogsData } from "../services/blogsData";
import { Link } from "react-router-dom";

const Blog = () => {
  const [isDivHover, setDivHover] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 390);

  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const swipeThreshold = 50;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 390);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rightHandler = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const leftHandler = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= blogsData.length) {
      containerRef.current.style.transition = "none";
      setCurrentIndex(0);
      containerRef.current.style.transform = `translateX(0px)`;
      setTimeout(() => {
        containerRef.current.style.transition = "transform 0.7s ease-in-out";
      });
    }
  };

  // 🟡 Handle swipe (touch and mouse)
  const handleStart = (e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setStartX(x);
    setIsDragging(true);
  };

  const handleMove = (e) => {
    if (!isDragging || startX === null) return;

    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = startX - x;

    if (Math.abs(distance) > swipeThreshold) {
      if (distance > 0) {
        rightHandler();
      } else {
        leftHandler();
      }
      setIsDragging(false);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    setStartX(null);
  };

  return (
    <div className="relative">
      <section className="pt-20">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
          LATEST FROM OUR BLOGS
        </div>
        <div
          onMouseEnter={() => setDivHover(true)}
          onMouseLeave={() => setDivHover(false)}
        >
          <div className="cursor-pointer gap-4 p-10 w-[85%] m-auto relative overflow-hidden">
            <div
              className="flex gap-5 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 325}px)`,
              }}
              onTransitionEnd={handleTransitionEnd}
              ref={containerRef}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
            >
              {blogsData.map((item, index) => (
                <Link to={`/blogs/${index + 1}`} key={index}>
                  <div className="shrink-0 relative overflow-hidden">
                    <div className="absolute left-2 top-2 h-12 bg-white w-12 flex justify-center items-center flex-col z-10">
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
                    <p className="text-center text-lg">{item.author}</p>
                    <p className="text-center rufina1 text-sm w-64 m-auto">
                      {item.content}
                    </p>
                  </div>
                </Link>
              ))}
              {/* Duplicate for infinite scroll */}
              {blogsData.map((item, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="shrink-0 relative overflow-hidden"
                >
                  <div className="absolute left-2 top-2 h-12 bg-white w-12 flex justify-center items-center flex-col z-10">
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

          {/* Arrows only if width ≥ 390px */}
          {!isMobile && (
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
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
