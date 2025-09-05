import React, { useContext, useEffect } from "react";
import { LogInContext } from "../contexts/LogInContext";

const Counter = ({ counter, userId, onIncrease, onDecrease, productId }) => {
  const userCartKey = `cart_${userId}`;

  const increaseQty = () => {
    // let products = JSON.parse(localStorage.getItem(userCartKey)) || [];
    // const updatedProducts = products.map((item) =>
    //   item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    // );
    // localStorage.setItem(userCartKey, JSON.stringify(updatedProducts));
    // updateProducts([...updatedProducts]);
    counter + 1;
    onIncrease(productId);
  };

  const decreaseQty = () => {
    // let products = JSON.parse(localStorage.getItem(userCartKey)) || [];
    // const product = products.find((item) => item._id === productId);
    // if (product && product.quantity === 1) {
    //   const updatedProducts = products.filter((item) => item._id !== productId);
    //   localStorage.setItem(userCartKey, JSON.stringify(updatedProducts));
    //   updateProducts(updatedProducts);
    //   return;
    // }
    // const updatedProducts = products.map((item) =>
    //   item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
    // );
    // localStorage.setItem(userCartKey, JSON.stringify(updatedProducts));
    // updateProducts(updatedProducts);
    onDecrease(productId);
  };

  return (
    <div className="flex items-center justify-center gap-x-2 border border-black rounded-md">
      <button className="font-bold text-2xl" onClick={decreaseQty}>
        -
      </button>
      {counter}
      <button className="font-bold text-2xl" onClick={increaseQty}>
        +
      </button>
    </div>
  );
};

export default Counter;
