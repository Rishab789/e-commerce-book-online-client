import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import "./Carousel.css";
import { Link } from "react-router-dom";

const Carousel = ({ data }) => {
  console.log("this is the dta", data);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onRightClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const onLeftClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="overflow-hidden w-full relative">
      <div
        className="flex transition-transform duration-1000 ease-in-out w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="flex-shrink-0 w-full h-[300px] md:h-[550px] lg:h-[650px]"
              style={{
                backgroundImage: `url(${item.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundPosition: "85% center",
              }}
            ></div>
          );
        })}
      </div>

      {/* conditional index  */}
      {currentIndex == 0 && (
        <>
          <div className="absolute left-20 top-[25%]  flex flex-col  items-center">
            <div className="hidden md:block lg:block">
              <p className="rufina1 text-3xl sm:text-5xl md:text-7xl mb-3 text-white first_title_animation">
                Stories That
              </p>
              <p className="rufina2 text-2xl sm:text-4xl md:text-8xl mb-3 second_title_animation">
                Inspire You
              </p>
            </div>
          </div>
          <div className="  absolute bottom-10 md:bottom-32  lg:bottom-52 w-full flex justify-center md:justify-start lg:justify-start">
            <button className="btn btn_animation bg-red-400 hover:text-white md:ml-36 lg:ml-36 ">
              Shop now
            </button>
          </div>
        </>
      )}
      {currentIndex == 1 && (
        <>
          <div className="absolute left-1 top-[25%]  flex flex-col items-center">
            <div className="hidden md:block lg:block">
              <p className="rufina1 text-xl md:text-7xl mb-3 text-black first_title_animation">
                We can help get your
              </p>
              <p className="rufina2 text-4xl text-[#f0932b] md:text-7xl mb-3 second_title_animation">
                Books in Order
              </p>
              <p className="rufina1 text-xl md:text-2xl mb-10 third_title_animation">
                and Accessories
              </p>
            </div>
          </div>
          <div className=" absolute bottom-10 md:bottom-32 lg:bottom-52 w-full flex justify-center md:justify-start lg:justify-start">
            <Link to="/contact">
              <button className="btn btn_animation md:ml-36 lg:ml-36 ">
                Contact Us Today!
              </button>
            </Link>
          </div>
        </>
      )}
      <div className="flex justify-between pl-5 pr-5 ">
        <FaChevronLeft
          className="text-3xl md:text-4xl lg:text-4xl"
          style={{
            position: "absolute",
            top: "50%",
            left: 20,
            cursor: "pointer",
          }}
          onClick={onLeftClick}
        />
        <FaChevronRight
          className="text-3xl md:text-4xl lg:text-4xl"
          style={{
            position: "absolute",
            top: "50%",
            right: 20,
            cursor: "pointer",
          }}
          onClick={onRightClick}
        />
      </div>
    </div>
  );
};

export default Carousel;
