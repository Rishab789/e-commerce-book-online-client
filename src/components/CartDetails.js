import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Button from "./Button";
import Counter from "./Counter";
import { Link, useNavigate } from "react-router-dom";
import { LogInContext } from "../contexts/LogInContext";
import { CartContext } from "../contexts/cart.context";

const CartDetails = () => {
  const navigate = useNavigate();
  const { userId } = useContext(LogInContext);
  const { products, setProducts, fetchCart } = useContext(CartContext);

  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_URL;

  // Calculate price whenever products change
  useEffect(() => {
    if (products.length > 0) {
      let total = products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setPrice(total);
    } else {
      setPrice(0);
    }
  }, [products]);

  // Remove item
  const handleRemoveItem = async (productId) => {
    if (!userId) return;
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/v1/removeFromCart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });

      const data = await response.json();
      if (data.success) {
        setProducts(data.cart.items);
        await fetchCart();
      } else {
        setError(data.message || "Failed to remove item");
      }
    } catch (err) {
      setError("Network error occurred while removing item");
    } finally {
      setLoading(false);
    }
  };

  // Increase quantity
  const handleIncreaseQuantity = async (productId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/increaseQty`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts(data.cart.items);
        await fetchCart();
      }
    } catch {
      setError("Failed to increase quantity");
    }
  };

  // Decrease quantity
  const handleDecreaseQuantity = async (productId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/decreaseQty`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts(data.cart.items);
        await fetchCart();
      }
    } catch {
      setError("Failed to decrease quantity");
    }
  };

  const handleCheckoutClick = () => {
    navigate("/checkout", {
      state: { cartItems: products, totalPrice: price },
    });
  };

  return (
    <div className="my-10 px-4 md:px-10">
      {/* Error */}
      {error && (
        <p className="mb-4 text-center text-red-600 font-medium">{error}</p>
      )}

      {/* Loading */}
      {loading && (
        <p className="mb-4 text-center text-blue-500 font-medium">
          Processing...
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 shadow-md rounded-lg bg-white">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700">
              <th className="px-4 py-2">TYPE</th>
              <th className="px-4 py-2">IMAGE</th>
              <th className="px-4 py-2">PRODUCT</th>
              <th className="px-4 py-2">PRICE</th>
              <th className="px-4 py-2">QUANTITY</th>
              <th className="px-4 py-2">TOTAL</th>
              <th className="px-4 py-2">REMOVE</th>
            </tr>
          </thead>
          <tbody>
            {products.map(
              ({ image, price, quantity, title, type, productId }) => (
                <tr
                  key={productId}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">
                    <p
                      className={`rounded-md text-center px-2 py-1 font-bold text-white text-sm inline-block ${
                        type === "book" ? "bg-green-500" : "bg-orange-500"
                      }`}
                    >
                      {type}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    {type == "book" ? (
                      <Link to={`/productDetails/${productId}`}>
                        <img
                          src={image}
                          width={80}
                          height={80}
                          alt={title}
                          className="rounded-md object-cover shadow-sm"
                        />
                      </Link>
                    ) : (
                      <Link to={`/ebookdetail/${productId}`}>
                        <img
                          src={image}
                          width={80}
                          height={80}
                          alt={title}
                          className="rounded-md object-cover shadow-sm"
                        />
                      </Link>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{title}</td>
                  <td className="px-4 py-3 font-semibold text-gray-700">
                    ₹ {price}/-
                  </td>
                  <td className="px-4 py-3">
                    <Counter
                      counter={quantity}
                      productId={productId}
                      onIncrease={handleIncreaseQuantity}
                      onDecrease={handleDecreaseQuantity}
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    ₹ {price * quantity}/-
                  </td>
                  <td
                    className="px-4 py-3 cursor-pointer text-center"
                    onClick={() => handleRemoveItem(productId)}
                  >
                    <MdDelete className="text-2xl text-red-600 hover:text-red-700 transition" />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {/* Empty Cart */}
        {products.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-xl text-gray-500">Your cart is empty</p>
            <Link
              to="/product"
              className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>

      {/* Cart Totals */}
      {products.length > 0 && (
        <div className="flex justify-end my-10">
          <div className="w-full max-w-md border border-gray-200 rounded-lg p-6 shadow bg-white">
            <p className="text-2xl font-semibold border-b pb-2">Cart Totals</p>
            <div className="flex justify-between my-3 text-gray-700">
              <p>SUBTOTAL</p>
              <p>₹ {price}</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>SHIPPING</p>
              <p>₹20</p>
            </div>
            <div className="flex justify-between my-3 text-lg font-semibold">
              <p>TOTAL</p>
              <p className="text-blue-600">₹ {price + 20}</p>
            </div>
            <Button
              value="Proceed to checkout"
              color="secondary-color"
              onClick={handleCheckoutClick}
              disabled={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetails;
