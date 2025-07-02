import React, { useEffect, useState } from "react";

const CarouselImages = ({ booksData }) => {
  const { image2 } = booksData[0];
  const [id, setId] = useState(image2[0].id);

  function rightClick() {
    if (id === image2.length) {
      setId(1);
    } else {
      setId(id + 1);
    }
  }

  function leftClick() {
    if (id == 1) {
      setId(image2.length);
    } else {
      setId(id - 1);
    }
  }

  useEffect(() => {
    let slide = setInterval(() => {
      if (id < image2.length) {
        setId((id) => id + 1);
      } else {
        setId(image2[0].id);
      }
    }, 3000);

    return () => {
      clearInterval(slide);
    };
  });

  return (
    <div>
      <div>
        <div className="div-img ">
          <img
            src={image2[id - 1].img}
            width={250}
            className="m-auto imageSlide"
          />
        </div>
        <div className="flex justify-center my-5 gap-5 ">
          {image2.map((item, index) => {
            return (
              <img
                key={index}
                onClick={() => setId(item.id)}
                src={item.img}
                width={100}
                className={`${
                  id == item.id ? "active" : ""
                }  cursor-pointer opacity-75 hover:opacity-100 duration-200`}
              />
            );
          })}
        </div>
        <div className="">
          <div
            className="left absolute left-0 cursor-pointer text-4xl"
            onClick={leftClick}
          >
            ◀️
          </div>
          <div
            className="right absolute right-0 cursor-pointer text-4xl"
            onClick={rightClick}
          >
            ▶️
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselImages;
