import React, { useContext, useEffect, useState } from "react";
import Stars from "./Stars";
import Counter from "./Counter";
import Button from "./Button";
import { IoMdHeart } from "react-icons/io";
import { booksData } from "../services/booksData";
import { Link, useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductsContext";
import AddReview from "./AddReview";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  decreaseCartItems,
  increaseCartItems,
} from "../store/slices/cartSlice";
import { LogInContext } from "./../contexts/LogInContext";
import axios from "axios";
import { CartContext } from "../contexts/cart.context";

const Product = () => {
  const { id } = useParams();
  const { allBooks } = useContext(ProductContext);
  const { setProducts, products, fetchCart } = useContext(CartContext);

  const [booksDetails, setBooksDetails] = useState(null);
  const [bookGenre, setGenre] = useState("");
  const [isReview, setIsReview] = useState(false);
  const [counter, setCounter] = useState(1);
  const [swapedImage, setSwapImage] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { userId } = useContext(LogInContext); // ✅ userId from context

  const API_BASE = `${process.env.REACT_APP_URL}/api/v1`;

  useEffect(() => {
    const books = allBooks.find((item) => item._id === id);
    if (books) {
      setBooksDetails(books);
      setGenre(booksData[0].genre);
      setSwapImage(books);
      setMainImage(books);
    }
  }, [id, allBooks]);

  if (!booksDetails) {
    return null;
  }

  const swapImages = () => {
    setToggle(!toggle);
    const imageChange1 = booksDetails.image2;
    const imageChange2 = booksDetails.image;
    setSwapImage(imageChange1);
    setMainImage(imageChange2);
  };

  // ✅ Add to cart API call
  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Please log in first!");
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        userId,
        productId: booksDetails._id,
        title: booksDetails.title,
        image: booksDetails.image,
        price: booksDetails.price,
        quantity: counter,
        type: booksDetails.type,
      };

      const res = await axios.post(`${API_BASE}/cart`, payload, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Product added to cart!");
        setProducts((prev) => [...prev, payload]);
        await fetchCart();
      } else {
        toast.error(res.data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row pt-20 px-10">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>

      {/* Product Details */}
      <div className="lg:w-3/4">
        <div className="flex flex-col md:flex-row lg:flex-row">
          {/* Image section */}
          <div className="md:w-1/2 flex flex-col justify-center items-center">
            <img
              src={toggle ? swapedImage : booksDetails.image}
              width={300}
              alt="product"
            />
            <div className="cursor-pointer mt-2" onClick={swapImages}>
              <img
                src={toggle ? mainImage : booksDetails.image2}
                width={100}
                alt="swap"
              />
            </div>
          </div>

          {/* Description section */}
          <div className="md:w-1/2 flex flex-col gap-5 relative">
            <p className="text-2xl md:text-3xl lg:text-4xl rufina1">
              {booksDetails.title}
            </p>
            <p>In Stock</p>
            <div className="flex flex-col md:flex-row lg:flex-row items-center gap-2">
              <Stars stars={booksDetails.stars} />
              <p>{booksDetails.reviews} Reviews</p>
              <a
                onClick={() => setIsReview(!isReview)}
                href="#"
                className="px-1 rounded-md shadow bg-white text-black py-1"
              >
                Add your Review
              </a>
              {isReview && (
                <AddReview
                  id={booksDetails._id}
                  name="User"
                  setIsReview={setIsReview}
                  setIsLoading={setIsLoading}
                />
              )}
            </div>
            <div className="flex gap-2 rufina1">
              <p className="text-2xl text-secondary-color">
                ₹{booksDetails.price}
              </p>
              <p className="line-through text-2xl">₹399.00</p>
            </div>

            <div className="flex flex-col md:flex-row lg:flex-row gap-5">
              <div className="border border-black flex items-center justify-between w-full px-2 md:w-20 lg:w-20">
                <button
                  className="font-bold text-2xl"
                  onClick={() => setCounter(Math.max(1, counter - 1))}
                >
                  -
                </button>
                {counter}
                <button
                  className="font-bold text-2xl"
                  onClick={() => setCounter(counter + 1)}
                >
                  +
                </button>
              </div>

              <Button
                value={isLoading ? "Adding..." : "Add to Cart"}
                color="sign-color"
                onClick={handleAddToCart}
                disabled={isLoading}
              />

              {/* <p className="flex items-center">
                Add to Wishlist{" "}
                <IoMdHeart className="cursor-pointer text-2xl" />
              </p> */}
            </div>

            <div>
              <p>{booksDetails.details}</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <p className="text-3xl">Reviews</p>
        <div className="mt-10 bg-slate-100 overflow-y-auto h-96">
          <ul className="flex flex-col gap-4 my-6">
            {booksDetails?.reviewsContent &&
            Array.isArray(booksDetails.reviewsContent) &&
            booksDetails.reviewsContent.length > 0 ? (
              booksDetails.reviewsContent.map((item, index) => (
                <li className="flex flex-col gap-1" key={index}>
                  <div className="flex flex-col md:flex-row lg:flex-row lg:items-center gap-2">
                    <p className="text-xl">{item.username}</p>
                    <Stars stars={item.stars} />
                  </div>
                  <p>{item.review}</p>
                </li>
              ))
            ) : (
              <p>No Reviews Yet</p>
            )}
          </ul>
        </div>
      </div>

      {/* Related Products */}
      <div className="lg:w-1/4">
        <p className="text-lg font-extrabold">RELATED PRODUCTS</p>
        <div className="overflow-y-auto h-1/4 ">
          {allBooks
            .filter((item) => item.genre === bookGenre)
            .map((item, index) => (
              <div
                className="flex my-2  flex-col md:flex-row lg:flex-row  items-center cursor-pointer"
                key={index}
              >
                <Link to={`/productDetails/${item._id}`}>
                  <img
                    src={item.image}
                    className="w-32 md:w-20 lg:w-20"
                    alt=""
                  />
                </Link>
                <div>
                  <Stars stars={item.rating} />
                  <p>{item.title}</p>
                  <p>
                    ₹{item.price} <span className="line-through">₹399</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
