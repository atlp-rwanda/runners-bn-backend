import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import Response from '../helpers/sendResponse';
import code from '../helpers/statusCode';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary.uploader;

export const uploadPic = async (files, res) => {
  try {
    let images = [];
    images = await Promise.all(files.map(async (file) => {
      const image = await cloudinary.uploader.upload(file.path, {
        folder: 'AccommodationPictures',
        use_filename: true,
      });
      return image.url;
    }));
    return images;
  } catch (error) {
    return Response.error(res, code.serverError, error);
  }
};
