import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

// Define o caminho absoluto da pasta de uploads
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

// Cria a pasta no servidor caso ela não exista ainda
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err, file.fieldname);
      
      const fileName = `${hash.toString('hex')}-${file.originalname}`;
      cb(null, fileName);
    });
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
  }
});

export default upload;