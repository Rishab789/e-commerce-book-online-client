import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Stars from "../components/Stars";
import { useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductsContext";
import { LogInContext } from "../contexts/LogInContext";
import AddReview from "../components/AddReview";
import Button from "../components/Button";
import { IoMdHeart } from "react-icons/io";
import { booksData } from "../services/booksData";
import axios from "axios";
import { CartContext } from "../contexts/cart.context";

export const EBooksDetailsPageComponent = () => {
  const { id } = useParams();

  const { allBooks, getAllEbooks, eBooks } = useContext(ProductContext);

  const [ebooksDetails, setebooksDetails] = useState(null);
  const [bookGenre, setGenre] = useState("");
  const [isReview, setIsReview] = useState(false);
  const [counter, setCounter] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // const dispatch = useDispatch();
  // const cartData = useSelector((state) => state.cart);
  const [cart, setCart] = useState([]);

  const { userId } = useContext(LogInContext); // Extract userId from context
  const { setProducts, products, fetchCart } = useContext(CartContext);

  const API_BASE = `${process.env.REACT_APP_URL}/api/v1`;

  // let products;

  // const getLocalStorage = () => {
  //   if (!userId) {
  //     return;
  //   }
  //   const userCartKey = `cart_${userId}`;

  //   // products = JSON.parse(localStorage.getItem("products") || "[]");
  //   const products = JSON.parse(localStorage.getItem(userCartKey)) || [];

  //   setCart(products);
  // };

  // const addToLocalStorage = (ebook) => {
  //   if (!ebook || !ebook._id || !userId) {
  //     // toast.error("Please log in to add items to your cart.");

  //     return;
  //   }

  //   const userCartKey = `cart_${userId}`;

  //   // const existingCart = JSON.parse(localStorage.getItem("products")) || [];
  //   const existingCart = JSON.parse(localStorage.getItem(userCartKey)) || [];

  //   // Check if book is already in cart
  //   const iseBookInCart = existingCart.some((item) => item._id === ebook._id);

  //   if (!iseBookInCart) {
  //     const updatedCart = [...existingCart, ebook];
  //     // localStorage.setItem("products", JSON.stringify(updatedCart));
  //     localStorage.setItem(userCartKey, JSON.stringify(updatedCart));

  //     setCart(updatedCart);
  //   }
  // };

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
        productId: ebooksDetails._id,
        title: ebooksDetails.title,
        image: ebooksDetails.imageFile,
        price: ebooksDetails.price,
        quantity: counter,
        type: "ebook",
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

  useEffect(() => {
    // getAllProducts();
    // getLocalStorage();
    const ebooks = eBooks.find((item) => item._id === id);
    setGenre(booksData[0].genre);

    setebooksDetails(ebooks);
    // setMainImage(books);
  }, [id, allBooks, userId]);
  if (!ebooksDetails) {
    return;
  }

  console.log("thi sis the ebook ", ebooksDetails.stars);

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
              <img src={ebooksDetails.imageFile} width={300} />
            </div>

            {/* <div className="">
              <img
                src={ebooksDetails.imageFiles}
                width={100}
                className="cursor-pointer"
              />
            </div> */}
          </div>
          {/* Description Section  */}
          <div className="md:w-1/2 flex flex-col gap-5 relative ">
            <p className="text-2xl md:text-3xl lg:text-4xl rufina1">
              {ebooksDetails.title}
            </p>
            <p>In Stock</p>
            <div className="flex flex-col md:flex-row lg:flex-row items-center gap-2 ">
              <Stars stars={ebooksDetails.stars} />
              <p>{ebooksDetails.reviews} Reviews</p>
              <a
                onClick={() => setIsReview(!isReview)}
                href="#"
                className="  px-1 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white text-black py-1"
              >
                Add your Review
              </a>
              {isReview && (
                <AddReview
                  id={ebooksDetails._id}
                  name="ebook user"
                  setIsReview={setIsReview}
                  setIsLoading={setIsLoading}
                  type={ebooksDetails.type}
                />
              )}
            </div>
            <div className="flex gap-2 rufina1">
              <p className="text-2xl text-secondary-color">
                ₹{ebooksDetails.price}
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
                    // dispatch(
                    //   decreaseCartItems({ productId: ebooksDetails._id })
                    // );
                  }}
                >
                  -
                </button>
                {counter}
                <button
                  className="font-bold text-2xl"
                  onClick={() => {
                    setCounter(counter + 1);

                    // dispatch(
                    //   increaseCartItems({
                    //     productId: ebooksDetails._id,
                    //     quantity: counter,
                    //   })
                    // );
                  }}
                >
                  +
                </button>
              </div>
              <Button
                value="Add to Cart"
                color="sign-color"
                onClick={handleAddToCart}
              />
              <p className="flex items-center ">
                Add to Wishlist{" "}
                <IoMdHeart className="cursor-pointer text-2xl" />
              </p>
            </div>
            <div>
              <p>{ebooksDetails.details}</p>
            </div>
          </div>
        </div>
        {/* Reviews Section  */}
        <p className="text-3xl">Reviews</p>
        <div className="mt-10 bg-slate-100 overflow-y-auto h-96">
          <ul className="flex flex-col gap-4  my-6 ">
            {ebooksDetails?.reviewsContent &&
            Array.isArray(ebooksDetails.reviewsContent) &&
            ebooksDetails.reviewsContent.length > 0 ? (
              ebooksDetails.reviewsContent.map((item, index) => (
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
