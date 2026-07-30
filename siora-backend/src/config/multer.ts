import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isRaw = file.mimetype.includes('pdf') || file.mimetype.includes('zip') || file.mimetype.includes('rar');

    return {
      folder: 'siora_uploads',
      resource_type: isRaw ? 'raw' : 'auto',
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

export default upload;