import React, { useState } from "react";

import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import "./Carousel.css";

const Carousel = ({ data }) => {
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
    <div className="overflow-hidden h-[400px] sm:h-[500px] md:h-[650px] lg:h-screen bg-green-200 w-full ">
      <div
        className="flex transition-transform duration-1000 ease-in-out "
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {/* {data.map((item, index) => {
          return <img src={item.src} alt={item.alt} key={index} />;
        })} */}
      </div>
      {/* conditional index  */}
      {currentIndex == 0 && (
        <div className="absolute left-20 top-[25%]  flex flex-col  items-center">
          <p className="rufina1 text-3xl sm:text-5xl md:text-7xl mb-3 text-white first_title_animation">
            Huge Sale
          </p>
          <p className="rufina2 text-2xl sm:text-4xl md:text-8xl mb-3 second_title_animation">
            Koparion
          </p>
          <p className="rufina1 text-xl md:text-2xl mb-10 third_title_animation">
            Now Starting at $99.00
          </p>
          <button className="btn btn_animation bg-red-400">Shop now</button>
        </div>
      )}
      {currentIndex == 1 && (
        <div className="absolute left-20 top-[25%]  flex flex-col items-center">
          <p className="rufina1 text-xl md:text-7xl mb-3 text-black first_title_animation">
            We can help get your
          </p>
          <p className="rufina2 text-4xl md:text-8xl mb-3 second_title_animation">
            Books in Order
          </p>
          <p className="rufina1 text-xl md:text-2xl mb-10 third_title_animation">
            and Accessories
          </p>
          <button className="btn btn_animation">Contact Us Today!</button>
        </div>
      )}
      <div className="flex justify-between pl-5 pr-5 ">
        <FaChevronLeft
          style={{
            fontSize: 45,
            position: "absolute",
            top: "50%",
            left: 20,
            cursor: "pointer",
          }}
          onClick={onLeftClick}
        />
        <FaChevronRight
          style={{
            fontSize: 45,
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
