import { Router } from 'express';
import { getDashboardAluno } from '../controllers/alunoController';

const router = Router();

router.get('/dashboard/aluno/:id/disciplinas', getDashboardAluno);

export default router;