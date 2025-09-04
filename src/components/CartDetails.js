import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Button from "./Button";
import Counter from "./Counter";
import { Link, useNavigate } from "react-router-dom";
import { LogInContext } from "../contexts/LogInContext";

const CartDetails = ({ cartData }) => {
  const navigate = useNavigate();
  const { userId } = useContext(LogInContext);

  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState([]);

  // Initialize products when cartData changes
  useEffect(() => {
    setProducts(cartData);
  }, [cartData]);

  // Recalculate price whenever products change
  useEffect(() => {
    if (products.length > 0) {
      let getVal = products.reduce(
        (acc, item) => acc + parseInt(item.price * item.quantity),
        0
      );
      setPrice(getVal);
    } else {
      setPrice(0);
    }
  }, [products]);

  const handleRemoveItem = (productId) => {
    const updatedProducts = products.filter((item) => item._id !== productId);
    setProducts(updatedProducts);

    const userCartKey = `cart_${userId}`;
    localStorage.setItem(userCartKey, JSON.stringify(updatedProducts));
  };

  const handleCheckoutClick = () => {
    navigate("/checkout", {
      state: { cartItems: products, totalPrice: price },
    });
  };

  return (
    <div className="my-10 ">
      <div className="overflow-x-auto">
        <table className="m-auto sm:w-1/2 md:w-full lg:w-full">
          <thead>
            <tr>
              <th>TYPE</th>
              <th>IMAGE</th>
              <th className="w-[40%]">PRODUCT</th>
              <th className="w-[20%]">PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL</th>
              <th>REMOVE</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products.map(({ _id, image, price, quantity, title, type }) => (
                <tr key={_id}>
                  <td>
                    <p
                      className={`rounded-md text-center px-1 font-bold text-white ${
                        type === "book" ? "bg-[#2ecc71]" : "bg-[#e67e22]"
                      }`}
                    >
                      {type}
                    </p>
                  </td>
                  <td>
                    <Link to={`/productDetails/${_id}`}>
                      <img src={image} width={100} alt={title} />
                    </Link>
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
                  <td>₹ {price * quantity}/-</td>
                  <td
                    className="cursor-pointer"
                    onClick={() => handleRemoveItem(_id)}
                  >
                    <MdDelete className="text-3xl text-red-600" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Cart Totals */}
      <div className="flex justify-center md:justify-end lg:justify-end my-10">
        <div className="rufina1">
          <p className="text-3xl border-b-2 border-black">Cart Totals</p>
          <div className="flex justify-between my-2">
            <p>SUBTOTAL</p>
            <p>₹ {price}</p>
          </div>
          <div className="flex justify-between">
            <p>SHIPPING</p>
            <p>₹20</p>
          </div>
          <div className="flex justify-between my-2">
            <p className="text-2xl">TOTAL</p>
            <p className="text-2xl text-secondary-color">₹ {price + 20}</p>
          </div>
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
