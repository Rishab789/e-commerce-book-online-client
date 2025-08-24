import React, { useState } from "react";

import Carousel from "./Carousel";
import { images } from "../services/carouselImages";

const Hero = () => {
  return (
    <div className="relative ">
      <div className="flex ">
        <Carousel data={images} />
      </div>
    </div>
  );
};

export default Hero;
