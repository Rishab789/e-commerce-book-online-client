import React, { useEffect, useState, useContext } from "react";
import CartDetails from "../components/CartDetails";
import EmptyCart from "../components/EmptyCart";
import { LogInContext } from "../contexts/LogInContext";

const Cart = () => {
  const { userId } = useContext(LogInContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_URL;

  // 🔹 Fetch cart API
  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/v1/cart/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setProducts(data.cart?.items || []);
      } else {
        console.log("Cart API returned error");
        setError(data.message || "Failed to fetch cart");
        setProducts([]);
      }
    } catch (err) {
      setError("Network error occurred while fetching cart");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const handleCartUpdate = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  return (
    <section className="px-10 md:px-20 lg:px-20 my-20">
      <div className="rufina1 text-3xl">Cart</div>
      {/* Error Display
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={handleRetry}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Retry
            </button>
          </div>
        </div>
      )} */}
      {/* Loading Indicator */}
      {loading && (
        <div className="mb-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700 mr-3"></div>
            <span>Loading cart...</span>
          </div>
        </div>
      )}
      {/* Cart Content */}
      {!loading && (
        <>
          {products.length === 0 ? (
            <EmptyCart />
          ) : (
            <CartDetails cartData={products} />
          )}
        </>
      )}
    </section>
  );
};

export default Cart;
