import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configura as credenciais obtidas no Dashboard do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Configura o storage do Multer para enviar diretamente ao Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'siora_uploads', // Nome da pasta criada dentro do seu Cloudinary
      resource_type: 'auto',   // Identifica automaticamente se é PDF, Imagem, ZIP, etc.
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    };
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // Limite mantido em 20MB
  },
});

export default upload;