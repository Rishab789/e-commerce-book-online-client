import React, { useState, useRef, useEffect, useContext } from "react";
import { booksData } from "../services/booksData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./TopInteresting.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { addCartItems } from "../store/slices/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import axios from "axios";
import { ProductContext } from "../contexts/ProductsContext";

const TopInteresting = () => {
  const booksDetails = useSelector((state) => state.productDetails);

  const dispatch = useDispatch();

  const [isDivHover, setDivHover] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef(null);

  const [favorites, setFavorites] = useState({});
  // const [allBooks, setAllBooks] = useState([]);

  const { allBooks, getAllProducts } = useContext(ProductContext);

  const addToLocalStorage = () => {};

  useEffect(() => {
    getAllProducts();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id], // Toggle the favorite state for the specific item
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
      // Disable transition and reset position to simulate seamless scrolling
      containerRef.current.style.transition = "none";
      setCurrentIndex(0); // Reset index
      containerRef.current.style.transform = `translateX(0px)`;

      // Re-enable transition after resetting
      setTimeout(() => {
        containerRef.current.style.transition = "transform 0.7s ease-in-out";
      });
    }
  };

  // const getAllProducts = async () => {
  //   try {
  //     let req = await axios.get("http://localhost:4000/api/v1/getProducts");

  //     setAllBooks(req.data.response);
  //   } catch (err) {
  //     console.log("Some Error coming while fetching!");
  //   }
  // };

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  return (
    <div>
      <section className="h-[100vh] mt-20 relative px-2">
        <div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
        <p className="text-center text-3xl font-semibold mb-6">
          TOP INTERESTING
        </p>
        <p className="m-auto text-center md:w-[50%] lg:w-[40%] rufina1 mb-6">
          Browse the collection of our best-selling and top interesting
          products. You'll definitely find what you are looking for.
        </p>
        {/* Main Container */}
        <div
          onMouseEnter={() => setDivHover(true)}
          onMouseLeave={() => setDivHover(false)}
        >
          <div className="cursor-pointer gap-4 p-10 w-[85%]  m-auto relative overflow-hidden">
            <div
              className="flex gap-5 transition-transform duration-700 ease-in-out "
              style={{
                transform: `translateX(-${currentIndex * 250}px)`,
              }}
              onTransitionEnd={handleTransitionEnd}
              ref={containerRef}
            >
              {allBooks.map(({ image, title, _id, price }) => (
                <div key={_id} className="shrink-0 main relative">
                  <button
                    onClick={() => toggleFavorite(_id)}
                    className="absolute right-9 top-1 bg-slate-100 rounded-full"
                  >
                    {favorites[_id] ? (
                      <IoMdHeart className="text-2xl  text-red-500" />
                    ) : (
                      <IoMdHeartEmpty className="text-2xl  text-black" />
                    )}
                  </button>
                  <div className="spread absolute "></div>
                  <Link to={`/productDetails/${_id}`}>
                    <img
                      src={image}
                      alt={title}
                      width={200}
                      className="cursor-pointer "
                    />
                  </Link>
                  <div
                    className="absolute bottom-12 right-12 flex"
                    // onClick={() => {
                    //   dispatch(
                    //     addCartItems({
                    //       productId: _id,
                    //       image,
                    //       title,
                    //       _id,
                    //       price,
                    //     })
                    //   );
                    //   toast.success("Product added to cart");
                    // }}
                  >
                    <Button value="Buy Now" color="sign-color" />
                  </div>

                  <p className="text-center rufina1">{title.slice(0, 20)}</p>
                  <p className="text-center rufina1">${price}</p>
                </div>
              ))}

              {/* Duplicate images for infinite scroll effect */}
              {allBooks.map(({ image, title, _id, price }) => (
                <div
                  key={`duplicate-${_id}`}
                  className="shrink-0 main relative"
                >
                  <div className="spread absolute "></div>

                  <Link to="/productDetails/1">
                    <img src={image} alt={title} width={200} />
                  </Link>
                  <div
                    className="absolute bottom-12 right-12 flex"
                    // onClick={() => {
                    //   dispatch(
                    //     addCartItems({
                    //       productId: _id,
                    //       image,
                    //       title,
                    //       id,
                    //       price,
                    //     })
                    //   );
                    //   toast.success("Product added to cart");
                    // }}
                  >
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
            className={`absolute top-[45%] left-0 right-0 flex justify-between items-center px-10 transition-opacity duration-500 ${
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
