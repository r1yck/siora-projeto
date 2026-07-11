import { Router } from 'express';
import { getDisciplinasAluno, getTurmasProfessor } from '../controllers/dashboardController';

const router = Router();

// Rota do Aluno
router.get('/aluno/:alunoId/disciplinas', getDisciplinasAluno);

// Rota do Professor
router.get('/professor/:professorId/turmas', getTurmasProfessor);

export default router;