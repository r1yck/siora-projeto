import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

// Rota de login apontando diretamente para a função
router.post('/login', login);

export default router;