import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import toast, { Toaster } from "react-hot-toast";
import { LoadingContext } from "../contexts/LoadingContext";

const BestSellingForm = () => {
  const url = process.env.REACT_APP_URL;

  const { loading, setLoading } = useContext(LoadingContext);
  console.log("loading", loading);

  const [author, setAuthor] = useState({
    authorName: "",
    authorBio: "",
    authorImage: null,
  });

  const [featureBook, setFeaturedBook] = useState({
    featureTitle: "",
    featureDescription: "",
    featurePrice: "",
    featureImage: null,
  });

  const [additionalBooks, setAdditionalBooks] = useState([]);

  function onAuthorChange(e) {
    setAuthor((prev) => {
      const { name, files, value } = e.target;
      return {
        ...prev,
        [name]: files ? files[0] : value,
      };
    });
  }

  function onFeatureChange(e) {
    setFeaturedBook((prev) => {
      const { name, files, value } = e.target;
      return {
        ...prev,
        [name]: files ? files[0] : value,
      };
    });
  }

  function onAddButtonClicked() {
    setAdditionalBooks((prev) => [
      ...prev,
      {
        title: "",
        description: "",
        price: "",
        image: null,
      },
    ]);
  }

  function onAdditionalChange(index, e) {
    const { name, value, files } = e.target;
    setAdditionalBooks((prev) =>
      prev.map((book, i) => {
        if (i === index) {
          return { ...book, [name]: files ? files[0] : value };
        }
        return book;
      })
    );
  }

  async function submitHandler(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("authorName", author.authorName);
    formData.append("authorBio", author.authorBio);
    formData.append("authorImage", author.authorImage);
    formData.append("featureTitle", featureBook.featureTitle);
    formData.append("featureDescription", featureBook.featureDescription);
    formData.append("featureImage", featureBook.featureImage);
    formData.append("featurePrice", featureBook.featurePrice);

    additionalBooks.forEach((book, index) => {
      formData.append(`books[${index}][title]`, book.title);
      formData.append(`books[${index}][description]`, book.description);
      formData.append(`books[${index}][price]`, book.price);
      formData.append(`books[${index}][image]`, book.image);
    });

    console.log(formData);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@222
    try {
      setLoading(true);
      const response = await fetch(`${url}/api/v1/sellingUploaded`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setLoading(false);
      } else {
        toast.error(data.message);
        // Handle signup failure
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  }

  return (
    <div className="">
      <span
        className={`loader absolute left-1/2 top-1/2 z-10 text-4xl ${
          loading ? "bloack" : "hidden"
        }`}
      ></span>

      <div className={`px-10  h-screen  ${loading ? " blur-sm" : " blur-0"}`}>
        <div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>

        <p className=" pt-10 text-3xl font-bold">Best Sellings!</p>
        <div>
          <form
            onSubmit={(e) => submitHandler(e)}
            action="/upload"
            method="POST"
            enctype="multipart/form-data"
          >
            <div className="flex justify-around items-center">
              <div className="flex flex-col w-1/3 ">
                <p>Author Name</p>

                <input
                  type="text"
                  name="authorName"
                  id="name"
                  value={author.authorName}
                  onChange={onAuthorChange}
                  className="border border-black h-10 px-2"
                />
              </div>
              <div className="flex flex-col w-1/3">
                <p>Author Bio</p>
                <textarea
                  type="text"
                  name="authorBio"
                  id="bio"
                  value={author.authorBio}
                  onChange={onAuthorChange}
                  className="border border-black h-10 px-2"
                />
              </div>
              <div>
                <p>Author's Image</p>
                <input
                  type="file"
                  name="authorImage"
                  id="authorImage"
                  onChange={onAuthorChange}
                />
              </div>
            </div>
            <div className="mt-10">
              <p className="text-3xl underline mb-5">Featured Book</p>
              {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
              {/* Component to be added  */}
              <div className="flex  items-center justify-around gap-x-5">
                <div className="flex flex-col w-1/3">
                  <p>Book Title</p>
                  <input
                    type="text"
                    name="featureTitle"
                    id="title"
                    value={featureBook.title}
                    onChange={onFeatureChange}
                    className="border border-black h-10 px-2"
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <p>Book Description</p>
                  <textarea
                    type="text"
                    name="featureDescription"
                    id="description"
                    value={featureBook.description}
                    onChange={onFeatureChange}
                    className="border border-black h-10 px-2"
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <p>Price</p>
                  <input
                    type="text"
                    name="featurePrice"
                    id="price"
                    value={featureBook.price}
                    onChange={onFeatureChange}
                    className="border border-black h-10 px-2"
                  />
                </div>
                <div>
                  <p>Featured Book Image</p>
                  <input
                    type="file"
                    name="featureImage"
                    id="featureImage"
                    onChange={onFeatureChange}
                  />
                </div>
              </div>
            </div>
            <Button value="Submit" color="btn-color" classNamew="w-full" />
          </form>
          {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
          <div className="mt-5 flex items-center gap-x-10">
            <p className="text-3xl underline mb-5">Additional Books</p>
            <Button
              value="Add Another Book"
              color="btn-color"
              onClick={onAddButtonClicked}
            />
          </div>
          {/* Additional Book Section  */}
          <div>
            {additionalBooks.map((book, index) => (
              <div
                className="flex  items-center justify-around gap-x-5"
                key={index}
              >
                <div className="flex flex-col w-1/3">
                  <p>Book Title</p>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={book.title}
                    onChange={(e) => onAdditionalChange(index, e)}
                    className="border border-black h-10 px-2"
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <p>Book Description</p>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    value={book.description}
                    onChange={(e) => onAdditionalChange(index, e)}
                    className="border border-black h-10 px-2"
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <p>Price</p>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={book.price}
                    onChange={(e) => onAdditionalChange(index, e)}
                    className="border border-black h-10 px-2"
                  />
                </div>
                <div>
                  <p>Featured Book Image</p>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e) => onAdditionalChange(index, e)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellingForm;
