import React, { useContext, useEffect, useRef, useState } from "react";
import Stars from "./Stars";
import Counter from "./Counter";
import Button from "./Button";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { booksData } from "../services/booksData";
import { useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductsContext";
import AddReview from "./AddReview";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  addCartItems,
  decreaseCartItems,
  increaseCartItems,
} from "../store/slices/cartSlice";
import { LogInContext } from "./../contexts/LogInContext";

const Product = () => {
  const { id } = useParams();

  const { allBooks, getAllProducts } = useContext(ProductContext);

  const [booksDetails, setBooksDetails] = useState(null);
  const [bookGenre, setGenre] = useState("");
  const [isReview, setIsReview] = useState(false);
  const [counter, setCounter] = useState(1);

  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const [swapedImage, setSwapImage] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useContext(LogInContext); // Extract userId from context

  let products;

  const getLocalStorage = () => {
    if (!userId) {
      return;
    }
    const userCartKey = `cart_${userId}`;

    // products = JSON.parse(localStorage.getItem("products") || "[]");
    const products = JSON.parse(localStorage.getItem(userCartKey)) || [];

    setCart(products);
  };

  const addToLocalStorage = (book) => {
    if (!book || !book._id || !userId) {
      // toast.error("Please log in to add items to your cart.");

      return;
    }

    const userCartKey = `cart_${userId}`;

    // const existingCart = JSON.parse(localStorage.getItem("products")) || [];
    const existingCart = JSON.parse(localStorage.getItem(userCartKey)) || [];

    // Check if book is already in cart
    const isBookInCart = existingCart.some((item) => item._id === book._id);

    if (!isBookInCart) {
      const updatedCart = [...existingCart, book];
      // localStorage.setItem("products", JSON.stringify(updatedCart));
      localStorage.setItem(userCartKey, JSON.stringify(updatedCart));

      setCart(updatedCart);
    }
  };

  useEffect(() => {
    // getAllProducts();
    getLocalStorage();
    const books = allBooks.find((item) => item._id === id);
    setGenre(booksData[0].genre);

    setBooksDetails(books);
    setSwapImage(books);
    setMainImage(books);
  }, [id, allBooks, userId]);
  if (!booksDetails) {
    return;
  }

  const swapImages = () => {
    setToggle(!toggle);
    const imageChange1 = booksDetails.image2;
    const imageChange2 = booksDetails.image;

    setSwapImage(imageChange1);
    setMainImage(imageChange2);
  };
  console.log("this is the book ", booksDetails);

  return (
    <div className="flex flex-col lg:flex-row pt-20  px-10">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      {/* Product div  */}
      <div className="lg:w-3/4 ">
        <div className="flex flex-col md:flex-row lg:flex-row">
          {/* Image section  */}
          <div className=" md:w-1/2  flex flex-col justify-center items-center">
            <div>
              <img
                src={toggle ? swapedImage : booksDetails.image}
                width={300}
              />
            </div>

            <div className="" onClick={() => swapImages()}>
              <img
                src={toggle ? mainImage : booksDetails.image2}
                width={100}
                className="cursor-pointer"
              />
            </div>
          </div>
          {/* Description Section  */}
          <div className="md:w-1/2 flex flex-col gap-5 relative ">
            <p className="text-2xl md:text-3xl lg:text-4xl rufina1">
              {booksDetails.title}
            </p>
            <p>In Stock</p>
            <div className="flex flex-col md:flex-row lg:flex-row items-center gap-2 ">
              <Stars stars={booksDetails.stars} />
              <p>{booksDetails.reviews} Reviews</p>
              <a
                onClick={() => setIsReview(!isReview)}
                href="#"
                className="  px-1 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white text-black py-1"
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
                {/* <Counter
                  counter={cartData[0] ? cartData[0].quantity : 0}
                  productId={cartData.productId}
                /> */}
                <button
                  className="font-bold text-2xl"
                  onClick={() => {
                    setCounter(counter - 1);
                    dispatch(
                      decreaseCartItems({ productId: booksDetails._id })
                    );
                  }}
                >
                  -
                </button>
                {counter}
                <button
                  className="font-bold text-2xl"
                  onClick={() => {
                    setCounter(counter + 1);

                    dispatch(
                      increaseCartItems({
                        productId: booksDetails._id,
                        quantity: counter,
                      })
                    );
                  }}
                >
                  +
                </button>
              </div>
              <Button
                value="Add to Cart"
                color="sign-color"
                onClick={() => {
                  addToLocalStorage({
                    _id: booksDetails._id,
                    image: booksDetails.image,
                    title: booksDetails.title,
                    price: booksDetails.price,
                    type: booksDetails.type,
                    quantity: counter,
                  });
                  // addToLocalStorage();

                  toast.success("Product added to cart");
                }}
              />
              <p className="flex items-center ">
                Add to Wishlist{" "}
                <IoMdHeart className="cursor-pointer text-2xl" />
              </p>
            </div>
            <div>
              <p>{booksDetails.details}</p>
            </div>
          </div>
        </div>
        {/* Reviews Section  */}
        <p className="text-3xl">Reviews</p>
        <div className="mt-10 bg-slate-100 overflow-y-auto h-96">
          <ul className="flex flex-col gap-4  my-6 ">
            {booksDetails?.reviewsContent &&
            Array.isArray(booksDetails.reviewsContent) &&
            booksDetails.reviewsContent.length > 0 ? (
              booksDetails.reviewsContent.map((item, index) => (
                <li className="flex flex-col gap-1 " key={index}>
                  <div className="flex flex-col  md:flex-row lg:flex-row lg:items-center gap-2 ">
                    <p className="text-xl ">{item.username}</p>
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
      {/* Related Products div  */}
      <div className=" lg:w-1/4">
        <p className="text-lg font-extrabold">RELATED PRODUCTS</p>
        <div className="overflow-y-auto h-1/4">
          {booksData
            .filter((item) => item.genre == bookGenre)
            .map((item, index) => (
              <div
                className="flex flex-col md:flex-row lg:flex-row items-center cursor-pointer"
                key={index}
              >
                <div>
                  <img src={item.image} className="w-32 md:w-20 lg:w-20" />
                </div>
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
