import React from "react";
import StripeBanners from "./../assets/stripeBanner.png";
import "./StripeBanner.css";

const StripeBanner = () => {
  return (
    <div className=" md:mt-10 lg:mt-0  bg-image  border border-black h-[20vh] m-auto w-[85vw] cursor-pointer  mb-20 lg:relative">
      <p className="text-white text-center text-xl font-bold lg:absolute lg:left-36 lg:top-2">
        G. Meyer Book Depot
      </p>
      <p className="text-white text-center text-xl sm:text-2xl md:text-3xl lg:text-3xl uppercase lg:absolute lg:top-9 lg:left-72 ">
        Sale up to 30% off
      </p>
    </div>
  );
};

export default StripeBanner;
