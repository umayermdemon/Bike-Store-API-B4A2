import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import httpStatus from "http-status";
import fs from "fs";
import config from "../config";
import AppError from "../errors/AppError";
export const sendImageToCloudinary = async (
  path: string,
  imageName: string,
) => {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
  });
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: imageName,
    })
    .catch(error => {
      if (error) {
        throw new AppError(httpStatus.CONFLICT, "Image uploaded failed");
      }
    });
  fs.unlink(path, err => {
    if (err) {
      console.error(`Error removing file: ${err}`);
      return;
    }

    console.log(`File ${path} has been successfully removed.`);
  });

  return uploadResult;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
