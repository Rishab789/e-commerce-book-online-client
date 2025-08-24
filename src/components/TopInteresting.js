import React, { useState, useRef, useEffect, useContext } from "react";
import { booksData } from "../services/booksData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./TopInteresting.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { addCartItems } from "../store/slices/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { ProductContext } from "../contexts/ProductsContext";
import Lottie from "lottie-react";
import loading from "../assets/loading.json";

const TopInteresting = () => {
  const booksDetails = useSelector((state) => state.productDetails);
  const dispatch = useDispatch();

  const [isDivHover, setDivHover] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState({});
  const containerRef = useRef(null);

  const { allBooks, getAllProducts } = useContext(ProductContext);

  // Touch and Mouse drag swipe states
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const minSwipeDistance = 50;

  useEffect(() => {
    getAllProducts();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  const rightHandler = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const leftHandler = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= booksData.length) {
      containerRef.current.style.transition = "none";
      setCurrentIndex(0);
      containerRef.current.style.transform = `translateX(0px)`;

      setTimeout(() => {
        containerRef.current.style.transition = "transform 0.7s ease-in-out";
      });
    }
  };

  // ✅ Swipe/Drag handlers for both touch and trackpad/mouse
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
      if (distance > 0) rightHandler();
      else leftHandler();
      setIsDragging(false);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    setStartX(null);
  };

  return (
    <div>
      <section className="h-[100vh] mt-20 relative px-2">
        <Toaster position="top-center" reverseOrder={false} />

        <p className="text-center text-3xl font-semibold mb-6">
          TOP INTERESTING
        </p>
        <p className="m-auto text-center md:w-[50%] lg:w-[40%] rufina1 mb-6">
          Browse the collection of our best-selling and top interesting
          products. You'll definitely find what you are looking for.
        </p>
        <div className=" flex justify-center absolute z-10 left-[40%] top-32">
          <Lottie animationData={loading} loop={true} className="w-20 h-20" />
        </div>

        <div
          onMouseEnter={() => setDivHover(true)}
          onMouseLeave={() => setDivHover(false)}
        >
          <div className="cursor-pointer gap-4 p-10 w-[85%] m-auto relative overflow-hidden">
            <div
              className="flex gap-5 transition-transform duration-700 ease-in-out select-none"
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
              {/* Original Books */}
              {allBooks.map(({ image, title, _id, price }) => (
                <div key={_id} className="shrink-0 main relative">
                  <button
                    onClick={() => toggleFavorite(_id)}
                    className="absolute right-9 top-1 bg-slate-100 rounded-full"
                  >
                    {favorites[_id] ? (
                      <IoMdHeart className="text-2xl text-red-500" />
                    ) : (
                      <IoMdHeartEmpty className="text-2xl text-black" />
                    )}
                  </button>
                  <div className="spread absolute"></div>
                  <Link to={`/productDetails/${_id}`}>
                    <img src={image} alt={title} width={200} />
                  </Link>
                  <div className="absolute bottom-12 right-12 flex">
                    <Button value="Buy Now" color="sign-color" />
                  </div>
                  <p className="text-center rufina1">{title.slice(0, 20)}</p>
                  <p className="text-center rufina1">${price}</p>
                </div>
              ))}

              {/* Duplicates for infinite scroll */}
              {allBooks.map(({ image, title, _id, price }) => (
                <div key={`dup-${_id}`} className="shrink-0 main relative">
                  <div className="spread absolute"></div>
                  <Link to={`/productDetails/${_id}`}>
                    <img src={image} alt={title} width={200} />
                  </Link>
                  <div className="absolute bottom-12 right-12 flex">
                    <Button value="Buy Now" color="sign-color" />
                  </div>
                  <p className="text-center rufina1">{title.slice(0, 20)}</p>
                  <p className="text-center rufina1">${price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div
            className={`absolute top-[55%] md:top-[55%] lg:top-[45%] left-0 right-0 flex justify-between items-center px-10 transition-opacity duration-500 ${
              isDivHover ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="bg-primary-color p-3 rounded-md cursor-pointer hover:bg-[#f07c29] hover:text-white duration-500"
              onClick={leftHandler}
            >
              <FaChevronLeft style={{ fontSize: 40 }} />
            </div>
            <div
              className="bg-primary-color p-3 rounded-md cursor-pointer hover:bg-[#f07c29] hover:text-white duration-500"
              onClick={rightHandler}
            >
              <FaChevronRight style={{ fontSize: 40 }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopInteresting;
