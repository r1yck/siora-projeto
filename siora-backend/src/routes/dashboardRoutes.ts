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
  postComunicadoDocente,
  postAvaliacaoDocente,
  removeComunicadoDocente,
  removeAvaliacaoDocente,
  removeMaterialDocente,
  postMaterialDocente,
  updateLocalizacaoDocente 
} from '../controllers/dashboardController';
import upload from '../config/multer';

const router = Router();

router.get('/aluno/:alunoId/disciplinas', getDisciplinasAluno);
router.get('/aluno/:alunoId/horarios', getHorariosAluno);
router.get('/professor/:professorId/turmas', getTurmasProfessor);

router.get('/calendario', getCalendarioMetas);
router.post('/tarefas', addMetaPrivada);
router.patch('/tarefas/:id/toggle', toggleMetaPrivada);
router.delete('/tarefas/:id', deleteMetaPrivada);

router.get('/disciplina/:id', getDetalhesCompletosDisciplina);

router.post('/professor/comunicado', postComunicadoDocente);
router.post('/professor/avaliacao', postAvaliacaoDocente);
router.delete('/professor/comunicado/:id', removeComunicadoDocente);
router.delete('/professor/avaliacao/:id', removeAvaliacaoDocente);
router.post('/professor/material', upload.single('file'), postMaterialDocente);
router.delete('/professor/material/:id', removeMaterialDocente);

router.patch('/professor/localizacao', updateLocalizacaoDocente);

export default router;