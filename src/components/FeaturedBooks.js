import React, { useContext, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ProductContext } from "../contexts/ProductsContext";
import { Link } from "react-router-dom";

const FeaturedBooks = () => {
  const [isDivHover, setDivHover] = useState(false);
  const [mainArray, setMainArray] = useState([]);
  const [onUI, setOnUI] = useState([]);
  const [animationClass, setAnimationClass] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Touch & Mouse Drag States
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragging, setDragging] = useState(false);

  const minSwipeDistance = 50;
  const { allBooks } = useContext(ProductContext);

  // Set items per page based on screen width
  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setItemsPerPage(2 * 2); // 2 per row x 2 rows
    } else if (width < 1024) {
      setItemsPerPage(3 * 2); // 3 per row x 2 rows
    } else {
      setItemsPerPage(4 * 2); // 4 per row x 2 rows
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
      const shiftCount = itemsPerPage / 2;

      if (direction === "right") {
        for (let i = 0; i < shiftCount; i++) {
          const first = rotated.shift();
          rotated.push(first);
        }
      } else {
        for (let i = 0; i < shiftCount; i++) {
          const last = rotated.pop();
          rotated.unshift(last);
        }
      }

      setMainArray(rotated);
      setOnUI(rotated.slice(0, itemsPerPage));
      setAnimationClass("");
    }, 300);
  };

  console.log(onUI);

  // Touch swipe handlers
  const onTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const onTouchMove = (e) => setTouchEndX(e.touches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) rotateWithAnimation("right");
    else if (distance < -minSwipeDistance) rotateWithAnimation("left");
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Mouse drag handlers
  const onMouseDown = (e) => {
    setDragStartX(e.clientX);
    setDragging(true);
  };
  const onMouseMove = (e) => {
    if (!dragging) return;
    const distance = dragStartX - e.clientX;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) rotateWithAnimation("right");
      else rotateWithAnimation("left");
      setDragging(false);
    }
  };
  const onMouseUp = () => setDragging(false);

  return (
    <div
      className="border-t  container relative"
      onMouseEnter={() => setDivHover(true)}
      onMouseLeave={() => setDivHover(false)}
    >
      <section className="pt-1  0 ">
        <div className="text-2xl md:text-3xl lg:text-3xl font-bold text-center">
          FEATURED BOOKS
        </div>

        <div
          className={`pt-10 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 transition-all duration-300 ease-in-out ${animationClass} select-none`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        >
          {onUI.map((book, id) => (
            <div key={id} className="flex flex-col items-center">
              <Link to={`/productDetails/${book._id}`}>
                <img src={book.image} alt={book.title} width={180} />
              </Link>
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
