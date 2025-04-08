import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const options = {
  folder: "job-hunt",
  resource_type: "auto" 
};

export const uploadFile = async (localFilePath) => {
  if (!localFilePath) {
    return null;
  }

  try {
    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, options);

    // Remove the local file after upload
    fs.unlinkSync(localFilePath);

    // Return the public URL and public_id (for deletion)
    return response.secure_url;
  } catch (error) {
    fs.unlinkSync(localFilePath); // Clean up the local file if upload fails
    console.error(error);
    return null;
  }
};

export const deleteFile = async (cloudinaryId) => {
  try {
    if (!cloudinaryId) return;
    await cloudinary.uploader.destroy(cloudinaryId);
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
  }
};
