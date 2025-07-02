import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Button from "./Button";
import Counter from "./Counter";
// import { useDispatch, useSelector } from "react-redux";
// import { removeCartItems } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { LogInContext } from "../contexts/LogInContext";
// import { LogInContext } from "./../contexts/LogInContext";

const CartDetails = ({ cartData }) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [price, setPrice] = useState(null);
  const [products, setProducts] = useState([]);
  // const [filtered, setFiltered] = useState([]);
  // const [storedProducts, setStoredProducts] = useState([]);

  const { userId } = useContext(LogInContext);
  console.log("this is the user id from product ...", userId);

  const priceCalculate = () => {
    let getPriceArray = products.map((item) => {
      return parseInt(item.price * item.quantity);
    });

    console.log(getPriceArray);

    let getVal = getPriceArray.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
    console.log("this is accumulated price ", getVal);
    setPrice(getVal);
  };

  useEffect(() => {
    // let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(cartData);
    console.log("this is card details ", cartData);
  }, []);

  useEffect(() => {
    priceCalculate();
  }, [products]);

  // const [counter, setCounter] = useState(1);

  const handleRemoveItem = (productId) => {
    // const updatedProducts = products.filter((item) => item._id !== productId);
    // console.log(productId);
    // setProducts(updatedProducts);
    // localStorage.setItem("products", JSON.stringify(updatedProducts));
    const updatedProducts = products.filter((item) => item._id !== productId);
    console.log("this is the updated products .. ", updatedProducts);
    setProducts(updatedProducts);
    const userCartKey = `cart_${userId}`;
    localStorage.setItem(userCartKey, JSON.stringify(updatedProducts)); // Update localStorage
  };

  const handleCheckoutClick = () => {
    console.log("handle checout cliked");
    navigate("/checkout", {
      state: { cartItems: products, totalPrice: price },
    });
  };

  return (
    <div className="my-10 ">
      <div className="overflow-x-auto">
        <table className="m-auto  sm:w-1/2 md:w-full lg:w-full ">
          <tr>
            <th>IMAGE</th>
            <th className="w-[40%]">PRODUCT</th>
            <th className="w-[20%] ">PRICE</th>
            <th>QUANTITY</th>
            <th>TOTAL</th>
            <th>REMOVE</th>
          </tr>

          {products.length > 0 &&
            products.map(({ _id, image, price, quantity, title }) => (
              <tr key={_id}>
                <>
                  <td>
                    <img src={image} width={100} />
                  </td>
                  <td>{title}</td>
                  <td>₹ {price}/-</td>
                  <td>
                    <div className="border border-black flex items-center justify-between px-2">
                      <Counter
                        counter={quantity}
                        productId={_id}
                        updateProducts={setProducts}
                        userId={userId}
                      />
                    </div>
                  </td>
                  <td>₹ 200/-</td>
                  <td
                    className="cursor-pointer"
                    onClick={() => {
                      // dispatch(removeCartItems({ productId }));
                      handleRemoveItem(_id);
                    }}
                  >
                    <MdDelete className="text-3xl text-red-600" />
                  </td>
                </>
              </tr>
            ))}
        </table>
      </div>
      <div className="flex justify-center md:justify-end lg:justify-end my-10">
        <div className="  rufina1 ">
          <p className="text-3xl border-b-2 border-black"> Cart Totals</p>
          <div className="flex justify-between my-2">
            <p>SUBTOTAL</p>
            <p>₹{100}</p>
          </div>
          <div className="flex justify-between">
            <p>SHIPPING</p>
            <p>₹{20}</p>
          </div>
          <div className="flex justify-between my-2">
            <p className="text-2xl">TOTAL</p>
            <p className="text-2xl text-secondary-color ">₹{price}</p>
          </div>
          {/* <button>PROCEED TO CHECKOUT</button> */}
          <Button
            value="Proceed to checkout"
            color="secondary-color"
            onClick={handleCheckoutClick}
          />
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
