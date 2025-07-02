import React from "react";
import cart from "./../../src/assets/cart.png";

const EmptyCart = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" rounded-full bg-[#eaeaea]">
        <img src={cart} width={300} />
      </div>
      <p className="text-xl md:text-3xl lg:text-3xl my-5">
        Your Cart is Empty!
      </p>
      <p className="text-xl">
        Looks like you have not added anything to your cart. Go ahead & explore
        categories.
      </p>
    </div>
  );
};

export default EmptyCart;
