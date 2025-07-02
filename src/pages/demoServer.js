const blogSchema = require("./../models/blog.model");
const cloudinary = require("cloudinary").v2; // Make sure Cloudinary is configured properly

exports.uploadBlogs = async (req, res) => {
  try {
    const files = req.files;
    const formData = req.body;

    console.log("this is file ", files);
    console.log("this is formData ", formData);

    const imageFile = files.find((file) => file.fieldname === "cover");
    const imageFileUrl = imageFile
      ? await uploadToCloudinary(imageFile.path)
      : null;

    const imageFile2 = files.find((file) => file.fieldname === "imageFile");
    const imageFile2Url = imageFile2
      ? await uploadToCloudinary(imageFile2.path)
      : null;

    const dataToSave = {
      title: formData.title,
      imageFile: imageFile2Url,
      cover: imageFileUrl,
      content: formData.content,
      desc: formData.desc,
      category: formData.category,
    };

    console.log("data", dataToSave);

    const newPost = new blogSchema(dataToSave);
    const savedPost = await newPost.save();

    res.json({
      success: true,
      message: "Blogs Uploaded Successfully!",
      post: savedPost,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

// Helper function to upload file to Cloudinary
async function uploadToCloudinary(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "bookstore", // Optional: specify folder name in Cloudinary
    });
    console.log("Cloudinary upload result:", result); // Add this line to check the upload result

    return result.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new Error("Image upload to Cloudinary failed");
  }
}
