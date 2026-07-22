import { Router } from 'express';
import upload from '../config/multer';
import { 
  submeterTrabalho, 
  buscarSubmissaoAluno, 
  listarEntregasAvaliacao, 
  lancarNota 
} from '../controllers/submissaoController';

const router = Router();

router.post('/avaliacoes/:avaliacaoId/submeter', upload.single('arquivo'), submeterTrabalho);
router.get('/avaliacoes/:avaliacaoId/estudante/:estudanteId', buscarSubmissaoAluno);
router.get('/avaliacoes/:avaliacaoId/submissoes', listarEntregasAvaliacao);
router.patch('/submissoes/:submissaoId/nota', lancarNota);

export default router;