import React, { useContext, useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import Button from "./Button";
import { LoadingContext } from "../contexts/LoadingContext";

const AddReview = ({ id, name, setIsReview }) => {
  const url = process.env.REACT_APP_URL;

  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviewData, setReviewData] = useState({
    star: "",
    review: "",
  });

  useEffect(() => {
    console.log("this is the rating", reviewData);
  }, [rating]);

  const { setLoading, loading } = useContext(LoadingContext);

  function changeHandler(e) {
    setReviewData((prev) => {
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
        star: rating,
      };
    });
  }

  async function SubmitHandler() {
    const updatedReviewData = { ...reviewData, star: rating };

    const formData = new FormData();
    formData.append("id", id);
    formData.append("username", name);
    // formData.append("review", reviewData.review);
    formData.append("stars", updatedReviewData.star);
    formData.append("review", updatedReviewData.review);

    console.log("this is formData val", formData);

    try {
      setLoading(true);
      const response = await fetch(`${url}/api/v1/uploadReviewsById`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: formData,
      });

      const data = await response.json();
      console.log("this is the response coming ", data);

      if (response.ok) {
        // toast.success(data.message);
        setLoading(false);
      } else {
        // toast.error(data.message);
        // Handle signup failure
      }
    } catch (e) {
      console.log(e);
      // toast.error("Something went wrong!");
    }
  }

  return (
    <div className="absolute -top-10 w-full ">
      <div
        className="absolute right-3 top-2 cursor-pointer"
        onClick={() => setIsReview(false)}
      >
        ❌
      </div>
      <div className=" shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white h-40 flex flex-col py-5 px-10 gap-y-5 ">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((num) => (
            <div className="">
              <FaStar
                className={`cursor-pointer text-3xl ${
                  num <= ((rating && hover) || hover)
                    ? "text-secondary-color"
                    : "text-gray-500"
                }`}
                onClick={() => setRating(num)}
                onMouseOver={() => setHover(num)}
                onMouseLeave={() => setHover(rating)}
              />
            </div>
          ))}
        </div>
        <input
          type="text"
          name="review"
          onChange={changeHandler}
          value={reviewData.review}
          placeholder="Write Your Review"
          className="px-1 text-lg border border-black"
        />
        <Button value="send" color="sign-color" onClick={SubmitHandler} />
      </div>
    </div>
  );
};

export default AddReview;
