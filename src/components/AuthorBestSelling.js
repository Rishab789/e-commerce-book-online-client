import React from "react";
import cover from "./../assets/jkCover.png";
import Slider from "./Slider";
import "./AuthorBestSelling.css";

const AuthorBestSelling = () => {
  return (
    <div>
      <section className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3    p-5 gap-4 ">
        <div>
          <p className="font-bold text-xl">AUTHOR BEST SELLING</p>
          <div className=" mb-10">
            <p className="rufina1 text-start lg:text-end text-6xl md:text-7xl lg:text-7xl text-secondary-color mb-3">
              J. K.
            </p>
            <p className="rufina1 text-start lg:text-end text-6xl md:text-7xl lg:text-7xl text-secondary-color mb-3">
              Rowling
            </p>
            <p className="uppercase text-start lg:text-end">
              categories:Books , Audiobooks
            </p>
          </div>

          <p className="rufina1 text-start lg:text-end mb-16">
            Vestibulum porttitor iaculis gravida. Praesent vestibulum varius
            placerat. Cras tempor congue neque, id aliquam orci finibus sit
            amet. Fusce at facilisis arcu. Donec aliquet nulla id turpis semper,
            a bibendum metus vulputate. Suspendisse potenti.
          </p>
        </div>
        <div className="bg-image-best">
          {/* <div className=" "> */}
          {/* <img
              src={cover}
              alt="author best selling"
              width={350}
              className="ml-10 hover:scale-110 duration-500"
            /> */}
          {/* </div> */}
        </div>
        <div>
          <Slider />
        </div>
      </section>
    </div>
  );
};

export default AuthorBestSelling;
