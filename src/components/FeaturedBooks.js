import React, { useContext, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ProductContext } from "../contexts/ProductsContext";

const FeaturedBooks = () => {
  const [isDivHover, setDivHover] = useState(false);
  const [mainArray, setMainArray] = useState([]);
  const [onUI, setOnUI] = useState([]);
  const [animationClass, setAnimationClass] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(8); // default to 4x2

  const { allBooks } = useContext(ProductContext);

  // Determine items per row based on screen width
  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setItemsPerPage(2 * 2); // mobile: 2 items per row x 2 rows
    } else if (width < 1024) {
      setItemsPerPage(3 * 2); // tablet: 3 items per row x 2 rows
    } else {
      setItemsPerPage(4 * 2); // desktop: 4 items per row x 2 rows
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    setMainArray(allBooks);
    setOnUI(allBooks.slice(0, itemsPerPage));
  }, [allBooks, itemsPerPage]);

  const rotateWithAnimation = (direction) => {
    setAnimationClass(direction === "right" ? "slide-left" : "slide-right");

    setTimeout(() => {
      let rotated = [...mainArray];
      if (direction === "right") {
        for (let i = 0; i < itemsPerPage / 2; i++) {
          const first = rotated.shift();
          rotated.push(first);
        }
      } else {
        for (let i = 0; i < itemsPerPage / 2; i++) {
          const last = rotated.pop();
          rotated.unshift(last);
        }
      }
      setMainArray(rotated);
      setOnUI(rotated.slice(0, itemsPerPage));
      setAnimationClass("");
    }, 300); // match with CSS animation duration
  };

  return (
    <div
      className="border-t mt-20 container relative"
      onMouseEnter={() => setDivHover(true)}
      onMouseLeave={() => setDivHover(false)}
    >
      <section className="pt-20">
        <div className="text-3xl font-bold text-center">FEATURED BOOKS</div>

        <div
          className={`pt-10 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 transition-all duration-300 ease-in-out ${animationClass}`}
        >
          {onUI.map((book, id) => (
            <div key={id} className="flex flex-col items-center">
              <img src={book.image} alt={book.title} width={180} />
              <p className="text-center rufina1">{book.title}</p>
              <p className="text-center rufina1">${book.price}</p>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <div
          className={`absolute top-[45%] left-0 right-0 flex justify-between items-center px-10 transition-opacity duration-500 ${
            isDivHover ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="bg-primary-color p-3 rounded-md cursor-pointer hover:bg-[#f07c29] hover:text-white duration-500"
            onClick={() => rotateWithAnimation("left")}
          >
            <FaChevronLeft style={{ fontSize: 40 }} />
          </div>
          <div
            className="bg-primary-color p-3 rounded-md cursor-pointer hover:bg-[#f07c29] hover:text-white duration-500"
            onClick={() => rotateWithAnimation("right")}
          >
            <FaChevronRight style={{ fontSize: 40 }} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedBooks;
