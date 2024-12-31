const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dlsd6e1rr",
  api_key: "863669586339194",
  api_secret: "XxvZ8KqXwq3e8FqjlVS3x8Mkz1A",
});

const storage = new multer.memoryStorage();

// upload image to cloudinary
async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

// delete image from cloudinary
async function imageDeleteUtil(publicId) {
  const result = await cloudinary.uploader.destroy(publicId);
  return result;
}

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil, imageDeleteUtil };