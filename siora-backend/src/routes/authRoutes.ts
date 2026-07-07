import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';

const router = Router();

// Define o endpoint de POST para o login
router.post('/login', AuthController.login);

export default router;