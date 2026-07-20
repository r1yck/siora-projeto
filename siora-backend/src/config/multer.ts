import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

// Configura o armazenamento em disco
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Aponta para a pasta uploads que criamos na raiz do backend
    cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    // Gera um hash aleatório para evitar conflito de nomes de arquivos iguais
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err, file.fieldname);
      
      const fileName = `${hash.toString('hex')}-${file.originalname}`;
      cb(null, fileName);
    });
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // Limite de 20MB por arquivo
  }
});