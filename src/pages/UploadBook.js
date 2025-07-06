import React, { useContext, useState } from "react";
import Button from "../components/Button";
import { LoadingContext } from "../contexts/LoadingContext";
import toast, { Toaster } from "react-hot-toast";

const UploadBook = () => {
  const url = process.env.REACT_APP_URL;

  const { setLoading, loading } = useContext(LoadingContext);
  const [formData, setFormData] = useState({
    image: "",
    image2: "",
    imageFile: "",
    imageFile2: "",
    authorName: "",
    title: "",
    price: "",
    genre: "",
    details: "",
    featured: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      setLoading(true);
      const response = await fetch(`${url}/api/v1/productsUpload`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
        // Handle signup failure
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  const changeHandler = (e) => {
    setFormData((prev) => {
      const { name, value, files } = e.target;
      return {
        ...prev,
        [name]: files ? files[0] : value,
      };
    });
  };

  return (
    <div>
      <div className="">
        <span
          className={`loader absolute left-1/2 top-1/2 z-10 text-4xl ${
            loading ? "block" : "hidden"
          }`}
        ></span>
        <p className="px-10 pt-10 text-3xl font-bold">Upload A Product!</p>
        <div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
        <div>
          <form className="  mt-20" onSubmit={(e) => submitHandler(e)}>
            <div className="flex flex-col px-10 ">
              {/* ***************** */}
              <div className="mb-4">
                <div className="flex gap-5">
                  <div className="flex flex-col w-1/2 ">
                    <p>Book Title</p>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={changeHandler}
                      className="border border-black rounded-sm h-10 px-2 "
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <p>Author Name</p>
                    <input
                      type="text"
                      name="authorName"
                      id="authorName"
                      value={formData.authorName}
                      onChange={changeHandler}
                      className=" border border-black rounded-sm h-10 px-2  "
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <p>Price</p>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={changeHandler}
                      className=" border border-black rounded-sm h-10 px-2  "
                    />
                  </div>
                </div>
              </div>
              {/* -------------------------- */}
              <div className="flex gap-5 mb-4">
                <div className="flex flex-col w-1/2 ">
                  <p>Book ImageUrl Front</p>
                  <input
                    type="text"
                    name="image"
                    id="image"
                    value={formData.image}
                    onChange={changeHandler}
                    className="border border-black rounded-sm h-10 px-2 "
                  />
                </div>
                <div className="flex flex-col w-1/2 ">
                  <p>Book ImageUrl Back</p>
                  <input
                    type="text"
                    name="image2"
                    id="image2"
                    value={formData.image2}
                    onChange={changeHandler}
                    className="border border-black rounded-sm h-10 px-2 "
                  />
                </div>
                <div className="flex flex-col w-1/2 ">
                  <p>Featured</p>
                  <select
                    name="featured"
                    id="featured"
                    value={formData.featured}
                    onChange={changeHandler}
                    className="border border-black text-black rounded-sm h-10"
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              </div>

              {/* ------------------------ */}
              <p className=" text-xl text-red-400">
                If You Want to Upload from System Files
              </p>
              <div className="flex gap-5 mb-4">
                <div className="flex flex-col w-1/2 ">
                  <p>Book Front</p>
                  <input
                    type="file"
                    name="imageFile"
                    id="imageFile"
                    onChange={changeHandler}
                    className="border border-black rounded-sm h-10 px-2 py-1"
                  />
                </div>
                <div className="flex flex-col w-1/2 ">
                  <p>Book Back</p>
                  <input
                    type="file"
                    name="imageFile2"
                    id="imageFile2"
                    onChange={changeHandler}
                    className="border border-black rounded-sm h-10 px-2 py-1 "
                  />
                </div>
              </div>

              {/* ------------ */}

              <div className="flex flex-col mb-4">
                <p>Book Description</p>
                <textarea
                  name="details"
                  id="details"
                  value={formData.details}
                  onChange={changeHandler}
                  className="border border-black rounded-sm "
                />
              </div>
              {/* -------------------- */}
              <div className="flex flex-col mb-4">
                <p>Book Category</p>
                <select
                  name="genre"
                  id="genre"
                  value={formData.genre}
                  onChange={changeHandler}
                  className="border border-black text-black rounded-sm h-10"
                >
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                </select>
              </div>
              <Button value="Submit" color="btn-color" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadBook;
