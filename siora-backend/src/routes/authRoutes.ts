import { Router } from 'express';
import { login, redefinirSenha } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.patch('/primeiro-acesso', redefinirSenha);

export default router;