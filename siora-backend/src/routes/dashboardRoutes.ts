import { Router } from 'express';
import { 
  getDisciplinasAluno, 
  getTurmasProfessor, 
  getHorariosAluno, 
  getCalendarioMetas, 
  addMetaPrivada, 
  toggleMetaPrivada, 
  deleteMetaPrivada,
  getDetalhesCompletosDisciplina,
} from '../controllers/dashboardController';

const router = Router();

router.get('/aluno/:alunoId/disciplinas', getDisciplinasAluno);

router.get('/aluno/:alunoId/horarios', getHorariosAluno);

router.get('/professor/:professorId/turmas', getTurmasProfessor);

router.get('/calendario', getCalendarioMetas);
router.post('/tarefas', addMetaPrivada);
router.patch('/tarefas/:id/toggle', toggleMetaPrivada);
router.delete('/tarefas/:id', deleteMetaPrivada);

router.get('/disciplina/:id', getDetalhesCompletosDisciplina);

export default router;