// import { useUser } from "@clerk/clerk-react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Write = () => {
  const url = process.env.REACT_APP_URL;

  const [value, setValue] = useState("");
  // const [img, setImg] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const ref = useRef(null);
  const coverRef = useRef(null);

  useEffect(() => {
    imgUrl &&
      // setValue((prev) => prev + `<p><img src=${imgUrl} width=${300}/></p>`);
      console.log(value);
  }, [imgUrl]);

  const uploadToCloudinary = async (file) => {
    console.log("upload to cloudinary called");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_blogs"); // Replace with your upload preset

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dlcsuxlco/image/upload", // Replace 'your_cloud_name'
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url; // Returns the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      toast.error("Failed to upload image");
    }
  };

  const handleCoverChange = async (e) => {
    console.log("handleCoverChange called");
    const file = e.target.files[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      setCoverUrl(url); // Set the cover image URL
      console.log("Cover URL set:", url);
    }
    e.target.value = ""; // Reset the input value
  };

  const handleImageChange = async (e) => {
    console.log("handle image change called ");
    const file = e.target.files[0];
    if (file) {
      const url = await uploadToCloudinary(file);
      setImgUrl(url); // Set the image URL for the content
      setValue((prev) => prev + `<p><img src="${url}" width=${300}/></p>`); // Add image to the editor content
    }
  };

  const submitHandler = async (e) => {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, "0"); // Ensures 2 digits for the day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", e.target.title.value);
    formData.append("date", formattedDate);
    formData.append("cover", coverUrl);
    formData.append("category", e.target.category.value);
    formData.append("desc", e.target.desc.value);
    formData.append("content", value);

    for (let [key, value] of formData.entries()) {
      console.log("this is data", key, value);
    }
    try {
      const response = await fetch(`${url}/api/v1/uploadBlog`, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: formData,
      });

      const getData = await response.json();
      console.log("this is form Data from cleint ", formData);

      if (response.ok) {
        toast.success(getData.message);
      } else {
        toast.error(getData.message || "An error occurred");
        // Handle signup failure
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message || "Something went wrong!");
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
          {coverUrl ? "Change Cover Image" : "Add Cover Image"}
        </button>
        <div>{coverUrl && <img width={300} src={coverUrl} />}</div>
        <input
          type="file"
          name="cover"
          id="cover"
          ref={coverRef}
          onChange={handleCoverChange}
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
              onChange={handleImageChange}
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
