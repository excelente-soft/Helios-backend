import cloudinary from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME, CLOUDINARY_UPLOAD_PRESET } from '@config';
import { StatusCode } from '@interfaces/status.interface';
import { ControlledException } from '@utils/exceptions';

cloudinary.v2.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const uploadAvatar = async (avatar: string) => {
  try {
    const uploadedResponse = await cloudinary.v2.uploader.upload(avatar, { upload_preset: CLOUDINARY_UPLOAD_PRESET });
    return uploadedResponse;
  } catch (err) {
    throw new ControlledException(
      'The image is not an image or contains sexually explicit material',
      StatusCode.NOT_ACCEPTABLE,
    );
  }
};
