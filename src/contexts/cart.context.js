// src/contexts/CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { LogInContext } from "./LogInContext";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { userId } = useContext(LogInContext);
  const API_BASE_URL = process.env.REACT_APP_URL;

  // Fetch cart API
  const fetchCart = async () => {
    if (!userId) {
      setProducts([]);
      return;
    }
    if (!API_BASE_URL) {
      setError("API configuration error");
      return;
    }

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
      console.log("this is the cart data ", data);

      if (data.success) {
        setProducts(data.cart?.items || []);
      } else {
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
    } else {
      setProducts([]);
    }
  }, [userId]);

  return (
    <CartContext.Provider
      value={{
        products,
        loading,
        error,
        fetchCart,
        setProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
