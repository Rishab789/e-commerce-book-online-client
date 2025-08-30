import React from "react";
import Button from "./../components/Button";
import { Link } from "react-router-dom";

const EBookProducts = ({ product }) => {
  const { imageFile, price, title, _id } = product;
  return (
    <Link to={`/ebookdetail/${_id}`}>
      <div className="border border-black cursor-pointer flex flex-col ">
        <div className="flex flex-col justify-center items-center">
          <img src={imageFile} width={200} />
          <p className="text-2xl">{title.slice(0, 5)}</p>
          <p className="">
            ₹{price}
            <span className="line-through">₹399/-</span>
          </p>
        </div>
        <Button value="Buy Now" color="btn-color" />
      </div>
    </Link>
  );
};

export default EBookProducts;
