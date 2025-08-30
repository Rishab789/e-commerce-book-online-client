import React, { useState } from "react";
import Button from "../components/Button";
import toast, { Toaster } from "react-hot-toast";

const EBookSaveForm = () => {
  const url = process.env.REACT_APP_URL;

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    imageUrl: "",
    imageFile: "",
    link: "",
    description: "",
    category: "",
    type: "ebook",
  });

  async function submitHandler(e) {
    e.preventDefault();
    console.log("this is the form data", formData);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await fetch(`${url}/api/v1/posts/create`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        // const result = await response.json();

        // Handle successful signup
        setFormData({
          title: "",
          author: "",
          price: "",
          imageUrl: "",
          imageFile: "",
          link: "",
          description: "",
          category: "",
        });
        toast.success(data.message);
      } else {
        toast.error(data.message);
        // Handle signup failure
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  }

  function changeHandler(e) {
    setFormData((prev) => {
      const { name, value, files } = e.target;
      return {
        ...prev,
        [name]: files ? files[0] : value,
      };
    });
  }

  return (
    <div>
      <div className="">
        <div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
        <p className="px-10 pt-10 text-3xl font-bold">Upload an e-Book!</p>
        <div>
          <form className="  mt-20" onSubmit={(e) => submitHandler(e)}>
            <div className="flex flex-col px-10 ">
              {/* ***************** */}
              <div className="mb-4">
                <div className="flex gap-5">
                  <div className="flex flex-col w-1/2 ">
                    <p>eBook Title</p>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      onChange={changeHandler}
                      value={formData.title}
                      className="border border-black rounded-sm h-10 px-2 "
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <p>Author Name</p>
                    <input
                      type="text"
                      name="author"
                      id="author"
                      onChange={changeHandler}
                      value={formData.author}
                      className=" border border-black rounded-sm h-10 px-2  "
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <p>Price</p>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      onChange={changeHandler}
                      value={formData.price}
                      className=" border border-black rounded-sm h-10 px-2  "
                    />
                  </div>
                </div>
              </div>
              {/* -------------------------- */}
              <div className="flex flex-col my-3 ">
                <p>eBook ImageUrl</p>
                <input
                  type="text"
                  name="imageUrl"
                  id="imageUrl"
                  onChange={changeHandler}
                  value={formData.imageUrl}
                  className="border border-black rounded-sm h-10 px-2 "
                />
              </div>

              {/*  */}
              <div className="flex flex-col my-3 ">
                <p>eBook ImageFile</p>
                <input
                  type="file"
                  name="imageFile"
                  id="imageFile"
                  onChange={changeHandler}
                  className="border border-black rounded-sm h-10 px-2 py-1"
                />
              </div>

              {/*  */}
              <div className="flex flex-col my-3 ">
                <p>eBook Download Link</p>
                <input
                  type="text"
                  name="link"
                  id="link"
                  onChange={changeHandler}
                  value={formData.link}
                  className="border border-black rounded-sm h-10 px-2 "
                />
              </div>

              {/*  ---------------------*/}

              {/* ------------------------ */}

              <div className="flex flex-col mb-4">
                <p>eBook Description</p>
                <textarea
                  className="border border-black rounded-sm "
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={changeHandler}
                />
              </div>
              {/* -------------------- */}
              <div className="flex flex-col mb-4">
                <p>eBook Category</p>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
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

export default EBookSaveForm;
