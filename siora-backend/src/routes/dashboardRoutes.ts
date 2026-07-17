import { Router } from 'express';
import { getDisciplinasAluno, getTurmasProfessor, getHorariosAluno } from '../controllers/dashboardController';
import { 
  getCalendarioMetas, 
  addMetaPrivada, 
  toggleMetaPrivada, 
  deleteMetaPrivada 
} from '../controllers/dashboardController';

const router = Router();

router.get('/aluno/:alunoId/disciplinas', getDisciplinasAluno);

router.get('/aluno/:alunoId/horarios', getHorariosAluno);

router.get('/professor/:professorId/turmas', getTurmasProfessor);

router.get('/calendario', getCalendarioMetas);
router.post('/tarefas', addMetaPrivada);
router.patch('/tarefas/:id/toggle', toggleMetaPrivada);
router.delete('/tarefas/:id', deleteMetaPrivada);

export default router;