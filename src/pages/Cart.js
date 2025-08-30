import React, { useContext, useEffect, useState } from "react";
import CartDetails from "../components/CartDetails";
import EmptyCart from "../components/EmptyCart";
import { useSelector } from "react-redux";
import { LogInContext } from "./../contexts/LogInContext";

const Cart = () => {
  // const cartData = useSelector((state) => state.cart);
  const [products, setProducts] = useState([]);

  const { userId } = useContext(LogInContext);
  const userCartKey = `cart_${userId}`;

  useEffect(() => {
    // const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const storedProducts = JSON.parse(localStorage.getItem(userCartKey)) || [];
    console.log("this is product getting ", storedProducts);

    setProducts(storedProducts);
  }, [userId]);

  return (
    <section className="px-10 md:px-20 lg:px-20 my-20 ">
      <div className="rufina1 text-3xl">Cart</div>
      {products.length == 0 ? (
        <EmptyCart />
      ) : (
        <CartDetails cartData={products} />
      )}
      ;
    </section>
  );
};

export default Cart;
