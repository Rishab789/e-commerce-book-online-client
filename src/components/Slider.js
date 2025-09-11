import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "./../contexts/ProductsContext"; // Adjust path as needed
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Slider = () => {
  const { allBooks } = useContext(ProductContext);
  const navigate = useNavigate();

  const [isDivHover, setDivHover] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const minSwipeDistance = 50;
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Filter only physical books (assuming type field exists) or use all books
  // const displayBooks =
  let books = allBooks.filter((book) => book.authorName === " J.K. Rowling");
  // console.log("this is the slider books ", displayBooks);

  const rightHandler = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const leftHandler = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= books.length) {
      containerRef.current.style.transition = "none";
      setCurrentIndex(0);
      containerRef.current.style.transform = `translateX(0px)`;
      setTimeout(() => {
        containerRef.current.style.transition = "transform 0.7s ease-in-out";
      });
    }
  };

  // Handle product click - navigate to product details
  const handleProductClick = (productId) => {
    navigate(`/productDetails/${productId}`);
  };

  // ✅ Handle touch and mouse swipe
  const handleStart = (e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setStartX(x);
    setIsDragging(true);
  };

  const handleMove = (e) => {
    if (!isDragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = startX - x;

    if (Math.abs(distance) > minSwipeDistance) {
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

  // Show loading state if books are not loaded yet
  if (books.length === 0) {
    return (
      <div className="mt-2 relative">
        <div className="p-10 w-full m-auto">
          <div className="flex justify-center items-center h-40">
            <p className="text-center rufina1">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="mt-2 relative">
        <div
          onMouseEnter={() => setDivHover(true)}
          onMouseLeave={() => setDivHover(false)}
        >
          <div className="cursor-pointer gap-4 p-10 w-full m-auto relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out select-none"
              style={{
                transform: `translateX(-${currentIndex * 250}px)`,
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
              {books.map((product, index) => (
                <div
                  key={product._id || index}
                  className="shrink-0 mx-2 cursor-pointer flex flex-col items-center"
                  onClick={() => handleProductClick(product._id)}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={300}
                    className="object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  />
                  <p className="text-center rufina1 mt-2 font-semibold w-36">
                    {product.title}
                  </p>
                  <p className="text-center rufina1 text-green-600 font-bold">
                    ${product.price}
                  </p>
                </div>
              ))}

              {/* Duplicates for infinite scroll effect */}
              {books.map((product, index) => (
                <div
                  key={`duplicate-${product._id || index}`}
                  className="shrink-0 mx-2 cursor-pointer flex flex-col items-center"
                  onClick={() => handleProductClick(product._id)}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    width={200}
                    height={300}
                    className="object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  />
                  <p className="text-center rufina1 mt-2 font-semibold w-36">
                    {product.title}
                  </p>
                  <p className="text-center rufina1 text-green-600 font-bold">
                    ${product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Only show if there are enough products */}
          {books.length > 1 && (
            <div
              className={`absolute top-[45%] left-0 right-0 flex justify-between items-center transition-opacity duration-500 ${
                isDivHover ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="bg-primary-color p-3 rounded-md cursor-pointer hover:bg-[#f07c29] hover:text-white duration-500 ml-4"
                onClick={leftHandler}
              >
                <FaChevronLeft style={{ fontSize: 40 }} />
              </div>
              <div
                className="bg-primary-color p-3 rounded-md cursor-pointer hover:bg-[#f07c29] hover:text-white duration-500 mr-4"
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

export default Slider;
