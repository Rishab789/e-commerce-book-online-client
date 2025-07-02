// import { useUser } from "@clerk/clerk-react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Write = () => {
  const [value, setValue] = useState("");
  const [img, setImg] = useState("");

  const ref = useRef(null);
  const coverRef = useRef(null);

  useEffect(() => {
    img && setValue((prev) => prev + `<p><image src=${img.url}/></p>`);
  }, [img]);

  const imageChangeHandler = (e) => {
    setImg((prev) => {
      const { name, value, files } = e.target;
      return {
        ...prev,
        [name]: files ? files[0] : value,
      };
    });
  };
  const changeHandler = (e) => {
    setValue((prev) => {
      const { name, files, value } = e.target;
      return {
        ...prev,
        [name]: files ? files[0] : value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", e.target.title.value);
    formData.append("cover", e.target.cover.files[0]);
    formData.append("category", e.target.category.value);
    formData.append("desc", e.target.desc.value);
    formData.append("imageFile", e.target.imageFile.files[0]);
    formData.append("content", value);

    for (let [key, value] of formData.entries()) {
      console.log("this is data", key, value);
    }
    try {
      const response = await fetch("http://localhost:4000/api/v1/uploadBlog", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:8000",
        },
        body: formData,
      });

      const getData = await response.json();

      if (response.ok) {
        toast.success(getData.message);
      } else {
        toast.error(getData.message);
        // Handle signup failure
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex  flex-col gap-6 px-5 py-5">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <h1 className="font-light ">Create a New Post</h1>
      <form
        className="flex  flex-col gap-6  "
        onSubmit={(e) => submitHandler(e)}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            coverRef.current.click();
          }}
          className="w-max p-2 shadow-md rounded-xl text-sm text-black bg-white"
        >
          Add a cover image
        </button>
        <input
          type="file"
          name="cover"
          id="cover"
          ref={coverRef}
          onChange={changeHandler}
          style={{ display: "none" }}
        />
        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="My Awesome Story"
          name="title"
        />
        <div className="flex  items-center gap-4">
          <label htmlFor="" className="text-sm">
            Choose a category
          </label>
          <select
            name="category"
            id=""
            className="p-2 rounded-xl bg-white text-black shadow-md"
          >
            <option value="general">General</option>
            <option value="fiction">Fiction</option>
            <option value="non-fiction">Non Fiction</option>
          </select>
        </div>
        <textarea
          placeholder="A short Description"
          name="desc"
          className="p-4 rounded-xl bg-white shadow-md"
        />
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 mr-2">
            <div className="cursor-pointer" onClick={() => ref.current.click()}>
              🖼️
            </div>
            <input
              type="file"
              name="imageFile"
              id="imageFile"
              ref={ref}
              onChange={imageChangeHandler}
              style={{ display: "none" }}
            />
          </div>

          <ReactQuill
            theme="snow"
            className="flex-1 rounded-xl bg-white shadow-md "
            value={value}
            onChange={setValue}
          />
        </div>
        <button className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36">
          Send
        </button>
      </form>
    </div>
  );
};

export default Write;
