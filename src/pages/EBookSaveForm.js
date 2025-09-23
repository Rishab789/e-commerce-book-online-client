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
    imageFile: null,
    ebookFile: null, // NEW: Added eBook file field
    description: "",
    category: "",
    type: "ebook",
  });

  const [isUploading, setIsUploading] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    setIsUploading(true);

    // Validate required fields
    if (!formData.title || !formData.author || !formData.price) {
      toast.error("Title, author, and price are required!");
      setIsUploading(false);
      return;
    }

    if (!formData.ebookFile) {
      toast.error("Please upload an eBook file!");
      setIsUploading(false);
      return;
    }

    console.log("Form data:", formData);

    const formDataToSend = new FormData();

    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch(`${url}/api/v1/posts/create`, {
        method: "POST",
        body: formDataToSend,
        // Note: Don't set Content-Type header when sending FormData
        // The browser will set it automatically with the correct boundary
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form on success
        setFormData({
          title: "",
          author: "",
          price: "",
          imageUrl: "",
          imageFile: null,
          ebookFile: null,
          link: "",
          description: "",
          category: "",
          type: "ebook",
        });

        // Clear file inputs
        document.getElementById("imageFile").value = "";
        document.getElementById("ebookFile").value = "";

        toast.success(data.message || "eBook uploaded successfully!");
      } else {
        toast.error(data.message || "Failed to upload eBook");
      }
    } catch (e) {
      console.error("Upload error:", e);
      toast.error("Something went wrong during upload");
    } finally {
      setIsUploading(false);
    }
  }

  function changeHandler(e) {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  return (
    <div>
      <div className="">
        <div>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
        <p className="px-10 pt-10 text-3xl font-bold">Upload an e-Book!</p>
        <div>
          <form className="mt-20" onSubmit={submitHandler}>
            <div className="flex flex-col px-10 ">
              {/* Title, Author, Price Row */}
              <div className="mb-4">
                <div className="flex gap-5">
                  <div className="flex flex-col w-1/2 ">
                    <label htmlFor="title" className="mb-1 font-medium">
                      eBook Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      onChange={changeHandler}
                      value={formData.title}
                      className="border border-gray-300 rounded-sm h-10 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="author" className="mb-1 font-medium">
                      Author Name *
                    </label>
                    <input
                      type="text"
                      name="author"
                      id="author"
                      onChange={changeHandler}
                      value={formData.author}
                      className="border border-gray-300 rounded-sm h-10 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="price" className="mb-1 font-medium">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      onChange={changeHandler}
                      value={formData.price}
                      className="border border-gray-300 rounded-sm h-10 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* eBook File Upload - REQUIRED */}
              <div className="flex flex-col my-3 ">
                <label htmlFor="ebookFile" className="mb-1 font-medium">
                  eBook File (PDF) *
                </label>
                <input
                  type="file"
                  name="ebookFile"
                  id="ebookFile"
                  onChange={changeHandler}
                  accept=".pdf,.epub,.mobi"
                  className="border border-gray-300 rounded-sm h-10 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {formData.ebookFile && (
                  <p className="text-sm text-green-600 mt-1">
                    Selected: {formData.ebookFile.name}
                  </p>
                )}
              </div>

              {/* Cover Image Options */}
              <div className="my-3 p-3 border border-gray-200 rounded-md">
                <h3 className="font-medium mb-2">Cover Image (Optional)</h3>

                {/* Image URL */}
                <div className="flex flex-col mb-3">
                  <label htmlFor="imageUrl" className="mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    id="imageUrl"
                    onChange={changeHandler}
                    value={formData.imageUrl}
                    placeholder="https://example.com/image.jpg"
                    className="border border-gray-300 rounded-sm h-10 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* OR - Image File Upload */}
                <div className="flex items-center mb-3">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-4 text-gray-500">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="imageFile" className="mb-1">
                    Upload Image File
                  </label>
                  <input
                    type="file"
                    name="imageFile"
                    id="imageFile"
                    onChange={changeHandler}
                    accept="image/*"
                    className="border border-gray-300 rounded-sm h-10 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formData.imageFile && (
                    <p className="text-sm text-green-600 mt-1">
                      Selected: {formData.imageFile.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col mb-4">
                <label htmlFor="description" className="mb-1 font-medium">
                  eBook Description
                </label>
                <textarea
                  className="border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={changeHandler}
                  rows="4"
                  placeholder="Describe the eBook content..."
                />
              </div>

              {/* Category */}
              <div className="flex flex-col mb-4">
                <label htmlFor="category" className="mb-1 font-medium">
                  eBook Category *
                </label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={changeHandler}
                  className="border border-gray-300 text-black rounded-sm h-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="education">Education</option>
                  <option value="technology">Technology</option>
                  <option value="business">Business</option>
                  <option value="self-help">Self-Help</option>
                  <option value="biography">Biography</option>
                  <option value="children">Children</option>
                </select>
              </div>

              {/* Submit Button */}
              <Button
                value={isUploading ? "Uploading..." : "Submit"}
                color="btn-color"
                type="submit"
                disabled={isUploading}
              />

              {isUploading && (
                <p className="text-blue-600 mt-2">
                  Uploading eBook... This may take a moment for larger files.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EBookSaveForm;
