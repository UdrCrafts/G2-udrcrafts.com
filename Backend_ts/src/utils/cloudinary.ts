import cloudinary from "../config/cloudinary";

export const uploadImage = async (filePath: string, folder = "products") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      use_filename: true,
      unique_filename: false
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw error;
  }
};
