import React, { useState, useEffect } from "react";
import { FaQuoteRight } from "react-icons/fa";
import { reviews } from "../services/reviews";
import "./Review.css";

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideAnimation, setSlideAnimation] = useState("slide-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideAnimation("slide-out"); // Trigger slide-out animation
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
        setSlideAnimation("slide-in"); // Reset to slide-in animation
      }, 500); // Match this timeout with the animation duration
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="mt-20  relative">
      <div className="h-[60vh] bg-black opacity-70 w-full z-10 absolute"></div>
      <section className=" h-[60vh] review-div flex flex-col items-center gap-10 bg-image-2">
        <div
          className={`border mt-10 border-white rounded-full h-20 w-20 flex justify-center items-center absolute z-20`}
        >
          <FaQuoteRight
            style={{
              fontSize: "40px",
              color: "white",
            }}
          />
        </div>
        <div className="text-center  overflow-hidden w-full absolute z-30 top-[50%]">
          <div className={`review-slide ${slideAnimation}`} key={currentIndex}>
            <p className="text-xl font-semibold text-white">
              {reviews[currentIndex].text}
            </p>
            <p className="mt-2 text-white">{reviews[currentIndex].user}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Review;
